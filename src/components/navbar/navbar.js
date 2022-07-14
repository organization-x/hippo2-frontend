import { Link } from 'react-router-dom';
import { useAuth } from '../../services/authentication';
import usePageTracking from '../../services/usePageTracking';
import logo from '../../logo.svg';
import './navbar.css';

function Navbar() {
	usePageTracking(); // google analytics
	// const [show] = useState(true); //change [show] to [show, setShow] if uncommenting showNav() below
	const show = true;
	const { user, handleLogout } = useAuth();
	// const showNav = () => {
	// 	setShow(!show);
	// };

	const onLogout = () => {
		handleLogout();
	};

	return (
		<header className='w-full py-3'>
			<div className="navbar container mx-auto px-3 md:px-0">
				<Link className='nav-logo' to="/">
					<img src={logo} alt='logo'/>
					<h1 className='text-3xl text-white font-semibold' >{/*Navbar*/}</h1>
				</Link>
				{/* <button className='navbar-collapse' onClick={() => showNav()}>
					<FontAwesomeIcon icon={faBars} />
				</button> */}
				<nav className={`${show ? 'show' : ''}`}>
					<ul className='nav-links grow'>
						{
							user.isLoggedIn && user.fName ? 
								<li>
									<span className='user-text'>Logged in as {user.fName}</span>
								</li>
								: null
						}
						{/* <li className='text-white hover:text-gray-300'>
							<Link to='/'>Page 1</Link>
						</li>
						<li className='text-white hover:text-gray-300'>
							<Link to='protected'>Page 2</Link>
						</li>
						<li className='text-white hover:text-gray-300'>
							<Link to='/introductionVideo'>Welcome Page</Link>
						</li> */}
					</ul>
					<ul className='nav-links grow-0'>
						{/* <li className='text-white hover:text-gray-300'>
							<Link to='signup'>Sign Up</Link>
						</li>
						<li className='text-white hover:text-gray-300'>
							<Link to='login'>Login</Link>
						</li> */}
						{
							user.isLoggedIn ? 
								<li className='logout'>
									<button onClick={() => onLogout()} >Logout</button>
								</li>
								: null
						}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
