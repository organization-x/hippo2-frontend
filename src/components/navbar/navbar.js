import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo.svg';
import './navbar.css';

function Navbar() {
	const [show, setShow] = useState(false);
	const showNav = () => {
		setShow(!show);
	};

	return (
		<header className='w-full py-3'>
			<div className="navbar container mx-auto px-3 md:px-0">
				<Link className='nav-logo' to="/">
					<img src={logo} alt='logo'/>
					<h1 className='text-3xl text-white font-semibold' >Navbar</h1>
				</Link>
				{/* <button className='navbar-collapse' onClick={() => showNav()}>
					<FontAwesomeIcon icon={faBars} />
				</button> */}
				<nav className={`${show ? 'show' : ''}`}>
					{/* <ul className='nav-links grow'>
						<li className='text-white hover:text-gray-300'>
							<Link to='/'>Page 1</Link>
						</li>
						<li className='text-white hover:text-gray-300'>
							<Link to='example'>Page 2</Link>
						</li>
					</ul>
					<ul className='nav-links grow-0'>
						<li className='text-white hover:text-gray-300'>
							<Link to='/'>Sign Up</Link>
						</li>
						<li className='text-white hover:text-gray-300'>
							<Link to='/'>Login</Link>
						</li>
					</ul> */}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
