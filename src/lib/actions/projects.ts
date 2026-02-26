"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function registerProject(formData: { title: string; repoUrl: string; tags: string[]; ownerId: string }) {
  try {
    const project = await prisma.project.create({
      data: {
        title: formData.title,
        repoUrl: formData.repoUrl,
        tags: formData.tags,
        ownerId: formData.ownerId,
      }
    });
    revalidatePath("/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to register project:", error);
    return { success: false, error: "Database registration failed." };
  }
}

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      owner: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}
