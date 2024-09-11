import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
    switch (role) {
        case 'Admin':
            return <AdministratorSidebarForm />;
        case 'Student':
            return <StudentSidebarForm />;
        case 'Staf':
            return <FacultySidebarForm />;
        default:
            return 'error';
    }
};

const NotificationBadge = ({ count }) => (
    count > 0 ? (
        <span className="ml-2 inline-block w-6 h-6 text-center bg-red-600 text-white rounded-full">
            {count}
        </span>
    ) : null
);

const SidebarItem = ({ to, children, notificationCount = 0 }) => (
    <li className="mb-2 flex items-center">
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } flex-grow`
            }
        >
            {children}
            <NotificationBadge count={notificationCount} />
        </NavLink>
    </li>
);

const BaseSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="lg:hidden bg-gray-800 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-500">Feedback System</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none"
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            <div className={`h-screen lg:w-64 bg-gray-900 text-white flex flex-col ${isOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="p-6 bg-gray-800 lg:block hidden">
                    <a href="/dashboard">
                        <h1 className="text-2xl font-bold text-center text-blue-500">Feedback System</h1>
                    </a>
                </div>
                <ul className="mt-6 flex-grow">{children}</ul>
                <div className="p-4 bg-gray-800">
                    <SidebarItem to="/">Log out</SidebarItem>
                </div>
            </div>
        </div>
    );
};

const StudentSidebarForm = () => (
    <BaseSidebar>
        <SidebarItem to="/profile">Profile</SidebarItem>
        <SidebarItem to="/feedbacks" notificationCount={""}>Surveys</SidebarItem>
        <SidebarItem to="/static-feedbacks" >Leave a Feedback</SidebarItem>
    </BaseSidebar>
);

const FacultySidebarForm = () => (
    <BaseSidebar>
        <SidebarItem to="/profile">Profile</SidebarItem>
        <SidebarItem to="/createfeedback" notificationCount={""}>Create Feedback</SidebarItem>
        <SidebarItem to="/survey">Surveys</SidebarItem>
    </BaseSidebar>
);

const AdministratorSidebarForm = () => (
    <BaseSidebar>
        <SidebarItem to="/profile">Profile</SidebarItem>
        <SidebarItem to="/register">Register Users</SidebarItem>
        <SidebarItem to="/faculty">Faculty Management</SidebarItem>
        <SidebarItem to="/assignment">Course Assignment</SidebarItem>
    </BaseSidebar>
);

export default Sidebar;
