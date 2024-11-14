"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        pathname === "/"
          ? "bg-background/80 backdrop-blur-md"
          : "bg-background border-b border-border"
      )}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/browse">
          <div className="flex items-center gap-4">
            <Dumbbell className="h-10 w-10 text-blue-600 hover:rotate-[360deg] transition-all duration-700 ease-in-out" />
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        <nav
          className={cn(
            "fixed md:relative top-[72px] md:top-0 left-0 md:left-auto",
            "w-full md:w-auto bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none",
            "border-b border-border md:border-none",
            "transition-all duration-300 ease-in-out",
            "flex flex-col md:flex-row items-center gap-2 md:gap-4 p-4 md:p-0",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0 pointer-events-none md:pointer-events-auto"
          )}
        >
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full hover:bg-accent transition-colors w-full md:w-auto text-center"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="px-4 py-2 rounded-full hover:bg-accent transition-colors w-full md:w-auto text-center"
          >
            Settings
          </Link>
          <Link
            href="/profile"
            className="px-4 py-2 rounded-full hover:bg-accent transition-colors w-full md:w-auto text-center"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={cn(
              "px-6 py-2 rounded-lg bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors disabled:opacity-50",
              "flex items-center justify-center gap-2 shadow-md hover:shadow-lg",
              "w-full md:w-auto"
            )}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              "Logout"
            )}
          </button>
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
