import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminClient } from "./admin-client";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Verify admin role
    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { role: true, status: true },
    });

    if (!profile || profile.role !== "admin" || profile.status !== "approved") {
        redirect("/");
    }

    // Fetch all pending users
    const pendingUsers = await prisma.profile.findMany({
        where: { status: "pending" },
        orderBy: { updatedAt: "asc" },
        select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
            githubUsername: true,
            techStack: true,
            updatedAt: true,
            status: true,
        },
    });

    return <AdminClient initialPending={pendingUsers} />;
}
