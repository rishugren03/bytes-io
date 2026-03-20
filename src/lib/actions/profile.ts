"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { calculatePowerScore } from "@/lib/score";

// Only these fields are allowed to be updated by the user
const ALLOWED_FIELDS = ["username", "fullName", "avatarUrl", "techStack", "leetcodeUsername", "bio", "githubUsername"] as const;

export async function updateProfile(data: {
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  techStack?: string[];
  leetcodeUsername?: string;
  bio?: string;
  githubUsername?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required." };
    }

    // Whitelist only allowed fields to prevent role/status escalation
    const sanitizedData: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
      if (key in data && data[key] !== undefined) {
        sanitizedData[key] = data[key];
      }
    }

    // Server-side username validation
    if (sanitizedData.username) {
      const username = sanitizedData.username as string;
      if (!/^[a-z0-9_]+$/.test(username)) {
        return { success: false, error: "Username can only contain small letters, numbers, and underscores." };
      }

      // Check for uniqueness
      const existingUser = await prisma.profile.findFirst({
        where: {
          username: username,
          NOT: { id: user.id }
        }
      });

      if (existingUser) {
        return { success: false, error: "Username already taken." };
      }
    }

    // Auto-populate githubUsername from Supabase user metadata if not provided
    if (!sanitizedData.githubUsername) {
      const ghUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username || "";
      if (ghUsername) {
        sanitizedData.githubUsername = ghUsername;
      }
    }

    const profile = await prisma.profile.upsert({
      where: { id: user.id },
      update: {
        ...sanitizedData,
        updatedAt: new Date(),
      },
      create: {
        id: user.id,
        username: (sanitizedData.username as string) || null,
        fullName: (sanitizedData.fullName as string) || null,
        avatarUrl: (sanitizedData.avatarUrl as string) || null,
        techStack: (sanitizedData.techStack as string[]) || [],
        leetcodeUsername: (sanitizedData.leetcodeUsername as string) || null,
        githubUsername: (sanitizedData.githubUsername as string) || null,
        bio: (sanitizedData.bio as string) || null,
        status: "pending",
        updatedAt: new Date(),
      }
    });

    const powerScore = await calculatePowerScore(user.id);
    
    const updatedProfile = await prisma.profile.update({
      where: { id: user.id },
      data: { powerScore }
    });

    revalidatePath("/");
    revalidatePath("/members");
    revalidatePath("/leaderboard");

    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Profile update failed." };
  }
}
