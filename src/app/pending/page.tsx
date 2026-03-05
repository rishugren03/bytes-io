import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PendingPageClient } from "./pending-client";
import prisma from "@/lib/prisma";

export default async function PendingPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { status: true, username: true, avatarUrl: true },
    });

    // If somehow approved, redirect to home
    if (profile?.status === "approved") {
        redirect("/");
    }

    const status = (profile?.status as "pending" | "rejected") ?? "pending";

    return (
        <PendingPageClient
            status={status}
            username={profile?.username ?? null}
            avatarUrl={profile?.avatarUrl ?? null}
        />
    );
}
