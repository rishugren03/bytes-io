import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculatePowerScore } from "@/lib/score";

export const maxDuration = 60; // Extend to 60s for background processing

export async function POST() {
  try {
    // 1. Fetch all approved students
    const students = await prisma.profile.findMany({
      where: { status: "approved" },
      select: { id: true }
    });


    if (students.length === 0) {
      return NextResponse.json({ message: "No approved students to process" });
    }

    // 3. Process sequentially with delay to avoid overwhelming APIs/DB
    // We trigger this but don't strictly wait for it to return to the user if called from client,
    // though here we are in a route handler, so we process it.
    console.log(`Starting background refresh for ${students.length} students...`);
    
    for (const student of students) {
      try {
        const powerScore = await calculatePowerScore(student.id);
        await prisma.profile.update({
          where: { id: student.id },
          data: { 
            powerScore, 
            updatedAt: new Date() 
          }
        });
        // 300ms delay between updates
        await new Promise(res => setTimeout(res, 300));
      } catch (err) {
        console.error(`Error updating score for student ${student.id}:`, err);
      }
    }

    return NextResponse.json({ done: true, processed: students.length });
  } catch (error) {
    console.error("Refresh route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
