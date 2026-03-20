"use client";

import { createClient } from "@/utils/supabase/client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, { useEffect } from "react";

if (typeof window !== "undefined") {
    posthog.init('phc_SenHNxmn7LCGuFrZlNxvfCxGOYSduAfGssL3rRU36vh', {
        api_host: "https://us.i.posthog.com/",
        person_profiles: "identified_only",
        capture_pageview: true,
        enable_recording_console_log: true,
    });
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const supabase = createClient();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session?.user) {
                    posthog.identify(session.user.id, {
                        email: session.user.email,
                        name: session.user.user_metadata?.full_name,
                    });
                } else {
                    posthog.reset();
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return children;
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
        </PostHogProvider>
    );
}
