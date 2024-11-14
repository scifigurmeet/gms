"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import withAuth from "@/components/withAuth";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div className="flex gap-2">
            <SidebarTrigger className="mt-0.5" />
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          </div>
          <p>
            Welcome to the admin panel. Here you can manage your application.
          </p>
          {/* Add more content here */}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default withAuth(Home);
