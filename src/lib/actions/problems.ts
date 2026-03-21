"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./auth";

export async function getEventWithProblems(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      createdBy: {
        select: { username: true, fullName: true, avatarUrl: true },
      },
      problems: {
        orderBy: { problemNumber: "asc" },
      },
    },
  });
  return event;
}

export async function createProblem(data: {
  eventId: string;
  title: string;
  description?: string;
  difficulty: string;
}) {
  try {
    const { user, error } = await requireAdmin();
    if (error || !user) {
      return { success: false, error: error || "Admin access required." };
    }

    const lastProblem = await prisma.problemStatement.findFirst({
      where: { eventId: data.eventId },
      orderBy: { problemNumber: "desc" },
    });
    const nextNumber = (lastProblem?.problemNumber || 0) + 1;

    const problem = await prisma.problemStatement.create({
      data: {
        eventId: data.eventId,
        problemNumber: nextNumber,
        title: data.title,
        description: data.description || null,
        difficulty: data.difficulty,
      },
    });

    revalidatePath(`/hackathons/${data.eventId}`);
    return { success: true, problem };
  } catch (error) {
    console.error("Failed to create problem:", error);
    return { success: false, error: "Failed to create problem." };
  }
}

export async function deleteProblem(problemId: string, eventId: string) {
  try {
    const { user, error } = await requireAdmin();
    if (error || !user) {
      return { success: false, error: error || "Admin access required." };
    }

    await prisma.problemStatement.delete({ where: { id: problemId } });
    revalidatePath(`/hackathons/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete problem:", error);
    return { success: false, error: "Failed to delete problem." };
  }
}

export async function addSubmission(problemId: string, eventId: string) {
  try {
    const { user, error } = await requireAdmin();
    if (error || !user) {
      return { success: false, error: error || "Admin access required." };
    }

    await prisma.problemStatement.update({
      where: { id: problemId },
      data: { submissions: { increment: 1 } },
    });

    revalidatePath(`/hackathons/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to add submission:", error);
    return { success: false, error: "Failed to add submission." };
  }
}
