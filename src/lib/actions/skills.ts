"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleSkill(userId: string, skillId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: { techStack: true, username: true }
    });

    if (!profile) return { success: false, error: "Profile not found" };

    let newStack = [...profile.techStack];
    if (newStack.includes(skillId)) {
      newStack = newStack.filter(s => s !== skillId);
    } else {
      newStack.push(skillId);
    }

    await prisma.profile.update({
      where: { id: userId },
      data: { techStack: newStack }
    });

    revalidatePath("/skills");
    revalidatePath(`/profile/${profile.username}`);
    
    return { success: true, techStack: newStack };
  } catch (error) {
    console.error("Failed to toggle skill:", error);
    return { success: false, error: "Failed to update skills." };
  }
}

export async function getProfile(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: userId }
    });
    return { success: true, profile };
  } catch (error) {
    return { success: false, error: "Failed to fetch profile" };
  }
}
