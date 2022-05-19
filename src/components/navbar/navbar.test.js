import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

test('navbar has "navbar" text', () => {
	render(
		<BrowserRouter>
			<Navbar />
		</BrowserRouter>
	);
	const linkElement = screen.getByText(/Navbar/i);
	expect(linkElement).toBeInTheDocument();
});
