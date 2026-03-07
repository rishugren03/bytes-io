import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Check if profile exists
        const profile = await prisma.profile.findUnique({
          where: { id: user.id },
          select: { status: true, role: true, username: true, githubUsername: true },
        })

        // No profile or no username yet → go to onboarding
        if (!profile || !profile.username) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }

        // Auto-backfill githubUsername from Supabase metadata if missing
        if (!profile.githubUsername) {
          const ghUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username || null;
          if (ghUsername) {
            await prisma.profile.update({
              where: { id: user.id },
              data: { githubUsername: ghUsername }
            });
          }
        }

        // All other users (pending, approved, rejected) → go home
        // Pages are public; pending users will just not appear on /members until approved
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-error`)
}
