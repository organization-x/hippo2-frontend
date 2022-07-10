import React from "react";
import DashboardBody from "./dashboard-body";
import { useState } from 'react';
import AlertBanner from './alertBanner';


function Dashboard() {

    const [page, setPage] = useState('dashboard-home');

    return (
        <div className="flex h-screen">
            <div className="w-64 h-full bg-neutral-300 pr-4">
                <ul className="mt-12 whitespace-nowrap">
                    <li className={`flex w-full justify-between ${page === 'dashboard-home' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('dashboard-home')} className="flex items-start focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">Dashboard Home</span>
                        </button>
                    </li>

                    <li className={`flex w-full justify-between ${page === 'To-Do' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('To-Do')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">To Do List</span>
                        </button>
                    </li>

                    <li className={`flex w-full justify-between ${page === 'account-settings' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('account-settings')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">Account Settings</span>
                        </button>
                    </li>

                    <li className={`flex w-full justify-between ${page === 'register-for-courses' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('register-for-courses')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">Register for Courses</span>
                        </button>
                    </li>

                    <li className={`flex w-full justify-between ${page === 'explore-student-products' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('explore-student-products')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">Explore Student Products</span>
                        </button>
                    </li>

                    <li className={`flex w-full justify-between ${page === 'help-center' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
                        <button onClick = {() => setPage('help-center')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                            <span className="font-medium text-base ml-5">Help Center</span>
                        </button>
                    </li>
                </ul>
            </div>
    
            <div className='w-full flex flex-col grow'>
                <div className='w-full'>
                        <AlertBanner />
                </div>
				<div className="grow overflow-y-scroll">
					<DashboardBody page={page}/>
				</div>
            </div>

        </div>
    );
}

export default Dashboard;
