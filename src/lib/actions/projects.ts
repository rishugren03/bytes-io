"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireApprovedUser } from "./auth";

export async function registerProject(formData: {
  title: string;
  description?: string;
  repoUrl: string;
  demoUrl?: string;
  tags: string[];
}) {
  try {
    const { user, error } = await requireApprovedUser();
    if (error || !user) {
      return { success: false, error: error || "Authentication required." };
    }

    const project = await prisma.project.create({
      data: {
        title: formData.title,
        description: formData.description || null,
        repoUrl: formData.repoUrl,
        demoUrl: formData.demoUrl || null,
        tags: formData.tags,
        ownerId: user.id,
      },
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
      owner: {
        select: { username: true, fullName: true, avatarUrl: true },
      },
      ratings: {
        select: { score: true, userId: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function rateProject(projectId: string, score: number) {
  try {
    const { user, error } = await requireApprovedUser();
    if (error || !user) {
      return { success: false, error: error || "Authentication required." };
    }

    if (score < 1 || score > 5) {
      return { success: false, error: "Score must be between 1 and 5." };
    }

    // Upsert the rating
    await prisma.projectRating.upsert({
      where: {
        projectId_userId: { projectId, userId: user.id },
      },
      update: { score },
      create: {
        projectId,
        userId: user.id,
        score,
      },
    });

    // Recalculate average rating
    const ratings = await prisma.projectRating.findMany({
      where: { projectId },
      select: { score: true },
    });

    const avg =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

    const roundedAvg = Math.round(avg * 10) / 10;

    await prisma.project.update({
      where: { id: projectId },
      data: {
        averageRating: roundedAvg,
        featured: roundedAvg >= 4.0,
      },
    });

    revalidatePath("/projects");
    return { success: true, averageRating: roundedAvg };
  } catch (error) {
    console.error("Failed to rate project:", error);
    return { success: false, error: "Failed to submit rating." };
  }
}

export async function getFeaturedProjects() {
  return await prisma.project.findMany({
    where: {
      OR: [{ featured: true }, { averageRating: { gte: 4.0 } }],
    },
    include: {
      owner: {
        select: { username: true, fullName: true, avatarUrl: true },
      },
      ratings: {
        select: { score: true, userId: true },
      },
    },
    orderBy: { averageRating: "desc" },
  });
}
