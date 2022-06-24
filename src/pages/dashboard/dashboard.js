import React from "react";
import DashboardBody from "./dashboard-body";
import { useState } from 'react';


function Dashboard(){

    const [page, setPage] = useState('');
    console.log(page)

    return (
        <div className="grid grid-cols-2">
            <div className="w-64 h-full bg-neutral-300 px-1 absolute">
            <ul className="mt-12">
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('dashboard-home')} className="flex items-start focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Dashboard Home</span>
                    </button>
                </li>
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('account-settings')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Account Setings</span>
                    </button>
                </li>

                <div className="py-3">
                    <div className="w-2/3 border-t-2 border-gray-400"></div>
                </div>

                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('course-details')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Course Details</span>
                    </button>
                </li>
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('payment-details')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Payment Details</span>
                    </button>
                </li>

                <div className="py-3">
                    <div className="w-2/3 border-t-2 border-gray-400"></div>
                </div>

                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('register-for-courses')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Register for Courses</span>
                    </button>
                </li>
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('upcoming-events')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Upcoming Events</span>
                    </button>
                </li>
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('explore-student-products')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Explore Student Products</span>
                    </button>
                </li>
                <li className="flex w-full justify-between text-gray-800 hover:text-gray-500 cursor-pointer items-center mb-5">
                    <button onClick = {() => setPage('help-center')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="font-medium text-base ml-5">Help Center</span>
                    </button>
                </li>
            </ul>

        </div>
            <div><DashboardBody page={page} /></div>
        </div>
    )
}

export default Dashboard