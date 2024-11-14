'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../lib/supabaseClient";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
        } else {
            router.push("/"); // Redirect to home page
        }
        setIsLoading(false);
    };

    return (
        <header className="w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200
            text-gray-800 flex justify-between items-center fixed top-0 z-50">
            <div className="flex items-center gap-4">
                <Image 
                    src="/logo.svg" 
                    alt="Logo" 
                    width={40} 
                    height={40} 
                    className="hover:rotate-[360deg] transition-all duration-700 ease-in-out" 
                />
                <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 
                    bg-clip-text text-transparent">Admin Panel</span>
            </div>

            <div className="md:hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            <nav className={`
                fixed md:relative top-[72px] md:top-0 left-0 md:left-auto
                w-full md:w-auto bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none
                border-b border-gray-200 md:border-none
                transition-all duration-300 ease-in-out
                ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0 pointer-events-none md:pointer-events-auto"}
                flex flex-col md:flex-row gap-2 md:gap-4 p-4 md:p-0
            `}>
                <a href="#" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Dashboard</a>
                <a href="#" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Settings</a>
                <a href="#" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Profile</a>
                <button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    className="px-6 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700
                        transition-colors disabled:opacity-50 flex items-center gap-2
                        shadow-md hover:shadow-lg"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span>Logging out...</span>
                        </>
                    ) : 'Logout'}
                </button>
            </nav>
        </header>
    );
}