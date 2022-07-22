import { Outlet, Link, useLocation } from 'react-router-dom';
import TTLogo from '../../components/ttlogo/ttlogo';

function Dashboard() {
	const location = useLocation();
	const split = location.pathname.split('/');
	const tail = split[split.length - 1];

	return (
		<div className="flex h-screen relative">
			<div className="flex flex-col bg-neutral-300">
				<nav className='w-64 h-full bg-neutral-300 pr-4 hidden lg:block'>
					<ul className="mt-16 list-none pl-6">
						<li className='mb-6 hover:text-gray-500'>
							<Link 
								to='' 
								className={`px-3 py-1 ${tail === 'dashboard' ? 'text-gray-500 cursor-default pointer-events-none' : ''}`}
							>
								Dashboard Home
							</Link>
						</li>
						<li className='mb-6 hover:text-gray-500'>
							<Link 
								to='todo' 
								className={`px-3 py-1 ${tail === 'todo' ? 'text-gray-500 cursor-default pointer-events-none' : ''}`}
							>
								To Do List
							</Link>
						</li>
						<li className='mb-6 hover:text-gray-500'>
							<Link 
								to='account' 
								className={`px-3 py-1 ${tail === 'account' ? 'text-gray-500 cursor-default pointer-events-none' : ''}`}
							>
								Account Settings
							</Link>
						</li>
						<li className='mb-6 hover:text-gray-500'>
							<Link 
								to='/courses' 
								className="px-3 py-1">
								Register for Courses
							</Link>
						</li>
						<li className='mb-6 hover:text-gray-500'>
							<a href='https://www.ai-camp.org/student-products' target='_blank' rel='noopener noreferrer' className="px-3 py-1">
								Explore Student Products
							</a>
						</li>
						<li className='mb-6 hover:text-gray-500'>
							<a href='https://www.ai-camp.org/summer-help-center' target='_blank' rel='noopener noreferrer' className="px-3 py-1">
								Help Center
							</a>
						</li>
					</ul>
				</nav>
				<TTLogo className='sticky bottom-10 left-1 p-6 text-white'/>
			</div>

			<div className='w-full flex flex-col flex-1'>
				<div className="grow overflow-y-scroll">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
