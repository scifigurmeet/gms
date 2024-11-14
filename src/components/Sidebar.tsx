import { useState } from "react";
import { 
    Bars3Icon, XMarkIcon,
    ChartBarIcon, UsersIcon, 
    Cog6ToothIcon, DocumentChartBarIcon 
} from "@heroicons/react/24/outline";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: ChartBarIcon, href: '#' },
        { name: 'Users', icon: UsersIcon, href: '#' },
        { name: 'Settings', icon: Cog6ToothIcon, href: '#' },
        { name: 'Reports', icon: DocumentChartBarIcon, href: '#' },
    ];

    return (
        <aside className={`
            fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 transition-all duration-300 ease-in-out
            w-64 bg-gradient-to-b from-slate-800 to-slate-900
            text-gray-100 p-6 flex flex-col gap-6 shadow-xl
        `}>
            <div className="flex justify-between items-center md:hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Dashboard
                </span>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg
                            text-gray-300 hover:text-white
                            hover:bg-slate-700/50 transition-all duration-200
                            group relative overflow-hidden"
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 transform -translate-x-full
                            group-hover:translate-x-0 transition-transform duration-200" />
                    </a>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;