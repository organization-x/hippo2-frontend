import { render, screen } from '@testing-library/react';
import Home from './home';

test('renders Home component', () => {
	render(<Home />);
	const linkElement = screen.getByText(/Home/i);
	expect(linkElement).toBeInTheDocument();
});
