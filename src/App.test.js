import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders Navbar', () => {
	render(<App />);
	const linkElement = screen.getByText(/Navbar/i);
	expect(linkElement).toBeInTheDocument();
});
