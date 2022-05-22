import { render, screen } from '@testing-library/react';
import Button from './button.js';

test('button test', () => {
    render(
        <Button className='h-11 w-44' bg_color='bg_white' txt_color='txt_black'>Student</Button>
    )
    const button = screen.getByRole('button', { name: 'Student' });
    expect(
        button.className.includes('h-11 w-44') &&
        button.className.includes('bg_white') &&
        button.className.includes('txt_black') &&
        button.className.includes('button') &&
        button.innerHTML === 'Student'
    );
});
