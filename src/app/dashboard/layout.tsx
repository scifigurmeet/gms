import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20">
      <SidebarProvider
        style={{
          "--sidebar-width": "14rem",
          // "--sidebar-width-mobile": "12rem",
        }}
      >
        <Navbar />
        <AppSidebar />
        <div className="mt-20">{children}</div>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
