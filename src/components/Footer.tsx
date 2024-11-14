function Footer() {
    return (
        <footer className="w-full py-6 px-4 bg-slate-900 text-gray-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-sm">&copy; 2023 Admin Panel. All rights reserved.</p>
                    <p className="text-xs mt-1">Version 1.0.0</p>
                </div>
                <div className="flex gap-6 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;