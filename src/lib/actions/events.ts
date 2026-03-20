"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./auth";

export async function createEvent(data: {
  title: string;
  description?: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxTeamSize?: number;
  prizeInfo?: string;
}) {
  try {
    const { user, error } = await requireAdmin();
    if (error || !user) {
      return { success: false, error: error || "Admin access required." };
    }

    const event = await prisma.event.create({
      data: {
        createdById: user.id,
        title: data.title,
        description: data.description || null,
        eventType: data.eventType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location || null,
        maxTeamSize: data.maxTeamSize || null,
        prizeInfo: data.prizeInfo || null,
      },
    });

    revalidatePath("/hackathons");
    return { success: true, event };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event." };
  }
}

export async function getEvents() {
  return await prisma.event.findMany({
    include: {
      createdBy: {
        select: { username: true, fullName: true, avatarUrl: true },
      },
    },
    orderBy: { startDate: "desc" },
  });
}

export async function deleteEvent(eventId: string) {
  try {
    const { user, error } = await requireAdmin();
    if (error || !user) {
      return { success: false, error: error || "Admin access required." };
    }

    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath("/hackathons");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event." };
  }
}
