import './footer.css';

function Footer() {

	return (

		<footer className=' inset-x-0 fixed bottom-0 p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 footer'>
			<span className='text-sm text-white sm:text-center'>© 2022 <a href="https://ai-camp.org" className='hover:underline'>AI Camp</a>
			</span>
			<ul className='flex flex-wrap items-center mt-3 text-sm sm:mt-0 text-white'>
			</ul>
		</footer>

    
	);
}

export default Footer;
