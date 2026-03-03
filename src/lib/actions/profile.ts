"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, data: {
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  techStack?: string[];
  leetcodeUsername?: string;
}) {
  try {
    const profile = await prisma.profile.upsert({
      where: { id: userId },
      update: {
        username: data.username,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
        techStack: data.techStack,
        leetcodeUsername: data.leetcodeUsername,
        updatedAt: new Date(),
      },
      create: {
        id: userId,
        username: data.username || "",
        fullName: data.fullName || "",
        avatarUrl: data.avatarUrl || "",
        techStack: data.techStack || [],
        leetcodeUsername: data.leetcodeUsername || "",
        status: "pending",
        updatedAt: new Date(),
      }
    });

    revalidatePath("/");
    revalidatePath("/members");
    revalidatePath("/leaderboard");

    return { success: true, profile };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Profile update failed." };
  }
}
