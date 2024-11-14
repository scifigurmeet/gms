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
        <header className="w-full p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            <nav className={`flex-col md:flex-row md:flex gap-4 ${isOpen ? "flex" : "hidden"} md:flex`}>
                <a href="#" className="hover:underline">Dashboard</a>
                <a href="#" className="hover:underline">Settings</a>
                <a href="#" className="hover:underline">Profile</a>
                <button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    className="hover:underline disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging out...
                        </>
                    ) : 'Logout'}
                </button>
            </nav>
        </header>
    );
}