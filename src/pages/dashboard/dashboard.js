import { useState } from 'react';
import DashboardBody from "./dashboard-body";


function Dashboard() {
	const [page, setPage] = useState('dashboard-home');

	return (
		<div className="flex h-screen relative">

			<div className="w-64 h-full bg-neutral-300 pr-4 hidden lg:inline-block">
				<ul className="mt-12 whitespace-nowrap">
					<li className={`flex w-full justify-between ${page === 'dashboard-home' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('dashboard-home')} className="flex items-start focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">Dashboard Home</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'To-Do' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('To-Do')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">To Do List</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'account-settings' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('account-settings')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">Account Settings</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'register-for-courses' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('register-for-courses')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">Register for Courses</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'upcoming-events' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('upcoming-events')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ml-5">Upcoming Events</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'explore-student-products' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('explore-student-products')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">Explore Student Products</span>
						</button>
					</li>

					<li className={`flex w-full justify-between ${page === 'help-center' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('help-center')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ">Help Center</span>
						</button>
					</li>
				</ul>
			</div>

			<div className='w-full flex flex-col flex-1'>
				<div className="grow overflow-y-scroll">
					<DashboardBody page={page} />
				</div>
			</div>

		</div>
	);
}

export default Dashboard;
