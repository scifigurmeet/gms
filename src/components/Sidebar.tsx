import { useState } from "react";
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 flex flex-col gap-4`}>
            <div className="flex justify-between items-center md:hidden">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            <a href="#" className="hover:bg-gray-600 p-2 rounded">Dashboard</a>
            <a href="#" className="hover:bg-gray-600 p-2 rounded">Users</a>
            <a href="#" className="hover:bg-gray-600 p-2 rounded">Settings</a>
            <a href="#" className="hover:bg-gray-600 p-2 rounded">Reports</a>
        </aside>
    );
}

export default Sidebar;