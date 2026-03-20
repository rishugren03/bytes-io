"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

/**
 * Get the currently authenticated user and their profile.
 * Returns null if not authenticated or profile doesn't exist.
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true, role: true, status: true },
  });

  // If the profile doesn't exist yet, return the authenticated user's ID
  // so that the onboarding route can create the profile later
  return profile ? { authId: user.id, ...profile } : null;
}

/**
 * Require an authenticated user with approved status.
 * Returns the user or an error object.
 */
export async function requireApprovedUser() {
  const user = await getAuthenticatedUser();
  if (!user) return { error: "Authentication required." };
  if (user.status !== "approved")
    return { error: "Your account must be approved to perform this action." };
  return { user };
}

/**
 * Require an authenticated admin with approved status.
 * Returns the user or an error object.
 */
export async function requireAdmin() {
  const user = await getAuthenticatedUser();
  if (!user) return { error: "Authentication required." };
  if (user.role !== "admin" || user.status !== "approved")
    return { error: "Admin access required." };
  return { user };
}
