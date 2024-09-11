import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard({ children }) {
    const userRole = localStorage.getItem('role');
    console.log(userRole);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar role={userRole} />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
}

export default Dashboard;