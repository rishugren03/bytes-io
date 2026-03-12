import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculatePowerScore } from "@/lib/score";

// We limit how many profiles to process in one cron run to avoid timeouts
const BATCH_SIZE = 10; 

export async function GET(req: Request) {
  // Check authorization - Vercel sends a CRON_SECRET in the headers
  const authHeader = req.headers.get('authorization');
  const vercelCronSecret = process.env.CRON_SECRET;
  
  if (process.env.NODE_ENV === 'production') {
    if (authHeader !== `Bearer ${vercelCronSecret}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  try {
    const profilesToUpdate = await prisma.profile.findMany({
      where: { status: "approved" },
      orderBy: { updatedAt: "asc" },
      take: BATCH_SIZE,
    });
    
    if (profilesToUpdate.length === 0) {
      return NextResponse.json({ message: "No approved profiles to update" });
    }

    const updatedCount = await Promise.all(
      profilesToUpdate.map(async (profile) => {
        try {
          // Fetch external scores in parallel within calculatePowerScore or here
          const powerScore = await calculatePowerScore(profile.id);
          
          await prisma.profile.update({
            where: { id: profile.id },
            data: { 
              powerScore, 
              updatedAt: new Date() 
            }
          });
          return true;
        } catch (err) {
          console.error(`Failed to update score for profile ${profile.id}:`, err);
          return false;
        }
      })
    ).then(rows => rows.filter(Boolean).length);

    return NextResponse.json({ 
      success: true, 
      processed: updatedCount,
      totalSelected: profilesToUpdate.length
    });

  } catch (error) {
    console.error("Cron score update error:", error);
    return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
  }
}
