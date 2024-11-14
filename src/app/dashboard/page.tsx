"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import withAuth from "../../components/withAuth";

function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <p>Welcome to the admin panel. Here you can manage your application.</p>
                    {/* Add more content here */}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default withAuth(Home);