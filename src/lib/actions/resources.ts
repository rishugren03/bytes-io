"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createResource(data: {
  createdById: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
}) {
  try {
    const resource = await prisma.resource.create({
      data: {
        createdById: data.createdById,
        title: data.title,
        description: data.description || null,
        url: data.url,
        category: data.category || "General",
      },
    });

    revalidatePath("/resources");
    return { success: true, resource };
  } catch (error) {
    console.error("Failed to create resource:", error);
    return { success: false, error: "Failed to share resource." };
  }
}

export async function getResources() {
  return await prisma.resource.findMany({
    include: {
      createdBy: {
        select: { username: true, fullName: true, avatarUrl: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteResource(resourceId: string, userId: string) {
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: { createdById: true },
    });

    if (!resource) {
      return { success: false, error: "Resource not found." };
    }

    // Allow deletion by the creator or admins
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (resource.createdById !== userId && profile?.role !== "admin") {
      return { success: false, error: "Not authorized to delete this resource." };
    }

    await prisma.resource.delete({ where: { id: resourceId } });
    revalidatePath("/resources");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return { success: false, error: "Failed to delete resource." };
  }
}
