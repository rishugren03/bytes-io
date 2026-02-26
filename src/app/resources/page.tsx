import { getResources } from "@/lib/actions/resources";
import { createClient } from "@/utils/supabase/server";
import { ResourcesClient } from "./resources-client";

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const resources = await getResources();

  return (
    <main>
      <ResourcesClient 
        initialResources={resources} 
        userId={user?.id || null} 
      />
    </main>
  );
}
