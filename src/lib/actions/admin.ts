"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin, getAuthenticatedUser } from "./auth";

export async function getPendingUsers() {
  try {
    const { error } = await requireAdmin();
    if (error) return { success: false, users: [] };

    const users = await prisma.profile.findMany({
      where: { status: "pending" },
      orderBy: { updatedAt: "asc" },
    });
    return { success: true, users };
  } catch (error) {
    console.error("Failed to fetch pending users:", error);
    return { success: false, users: [] };
  }
}

export async function getAllManagedUsers() {
  try {
    const { error } = await requireAdmin();
    if (error) return { success: false, users: [] };

    const users = await prisma.profile.findMany({
      where: { status: { in: ["pending", "rejected"] } },
      orderBy: { updatedAt: "asc" },
    });
    return { success: true, users };
  } catch (error) {
    console.error("Failed to fetch managed users:", error);
    return { success: false, users: [] };
  }
}

export async function approveUser(userId: string) {
  try {
    const { error } = await requireAdmin();
    if (error) return { success: false, error };

    await prisma.profile.update({
      where: { id: userId },
      data: { status: "approved" },
    });
    revalidatePath("/admin");
    revalidatePath("/members");
    return { success: true };
  } catch (error) {
    console.error("Failed to approve user:", error);
    return { success: false, error: "Failed to approve user." };
  }
}

export async function rejectUser(userId: string) {
  try {
    const { error } = await requireAdmin();
    if (error) return { success: false, error };

    await prisma.profile.update({
      where: { id: userId },
      data: { status: "rejected" },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to reject user:", error);
    return { success: false, error: "Failed to reject user." };
  }
}

export async function getProfileStatus(userId: string) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, profile: null };

    // Users can only check their own status; admins can check anyone's
    const targetId = user.role === "admin" ? userId : user.id;

    const profile = await prisma.profile.findUnique({
      where: { id: targetId },
      select: { status: true, role: true, username: true },
    });
    return { success: true, profile };
  } catch (error) {
    console.error("Failed to get profile status:", error);
    return { success: false, profile: null };
  }
}
