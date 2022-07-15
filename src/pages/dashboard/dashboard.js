import { useState } from 'react';
import "./dashboard.css";
import DashboardBody from "./dashboard-body";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../services/authentication";


function Dashboard() {
	const [page, setPage] = useState('dashboard-home');
	const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
	const { handleLogout } = useAuth();
	
	const handlePageSwitch = (page) => {
		setPage(page);
		setMobileMenuOpened(false);
	};

	const menuButtonColor = mobileMenuOpened ? `bg-gray-400` : `bg-transparent-green`;

	return (
		<div className="flex h-screen relative">
			<button className={`menu md:hidden absolute right-4 h-8 w-8 rounded-full transition-colors ${menuButtonColor}`}
				onClick={() => setMobileMenuOpened(!mobileMenuOpened)}>
				<FontAwesomeIcon className={mobileMenuOpened ?
					`mt-1 h-6 w-6 text-black` :
					`mt-1 h-5 w-5 text-neutral-800`} icon={mobileMenuOpened ? faXmark : faBars} />
			</button>

			<div className={`w-full h-full absolute top-0 left-0 z-50 bg-light-green flex flex-col md:hidden transparent ${mobileMenuOpened ? 'show' : null}`}>
				<div className="h-24 bg-transparent-green p-8 text-right text-xl flex-initial">
					<button onClick={() => handleLogout()}>Log Out</button>
				</div>
				<div className="menu-items flex-grow py-6 px-8 text-right text-xl">
					<button onClick={() => handlePageSwitch('dashboard-home')}>Home</button>
					<hr />
					<button onClick={() => handlePageSwitch('To-Do')}>To Do List</button>
					<hr />
					<button onClick={() => handlePageSwitch('account-settings')}>Account Settings</button>
					<hr />
					<button onClick={() => handlePageSwitch('register-for-courses')}>Register for Courses</button>
					<hr />
					<button onClick={() => handlePageSwitch('upcoming-events')}>Upcoming Events</button>
					<hr />
					<button onClick={() => handlePageSwitch('explore-student-products')}>Explore Student Products</button>
					<hr />
					<button onClick={() => handlePageSwitch('help-center')}>Help Center</button>
					<hr />
				</div>
			</div>

			<div className="w-64 h-full bg-neutral-300 pr-4 hidden md:inline-block">
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

					<li className={`flex w-full justify-between ${page === 'upcoming-events' ? 'text-gray-500' : 'text-gray-800 hover:text-gray-500'} cursor-pointer items-center mb-5`}>
						<button onClick = {() => setPage('upcoming-events')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
							<span className="font-medium text-base ml-5">Upcoming Events</span>
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
				<div className="grow overflow-y-scroll">
					<DashboardBody page={page} navigate={setPage}/>
				</div>
			</div>

		</div>
	);
}

export default Dashboard;
