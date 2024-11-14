import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import TopMarginContainer from "@/components/top-margin-container";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TopMarginContainer>
      <SidebarProvider
        style={{
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "12rem",
        }}
      >
        <Navbar />
        <AppSidebar />
        <div className="">{children}</div>
      </SidebarProvider>
    </TopMarginContainer>
  );
}

export default Layout;
