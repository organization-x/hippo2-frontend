import { render, screen } from '@testing-library/react';
import Button from './button.js';

test('button test', () => {
    render(
        <Button className='h-11 w-44' bgColor='white' txtColor='black'>Student</Button>
    )
    const button = screen.getByRole('button', { name: 'Student' });
    expect(
        button.className.includes('h-11 w-44') &&
        button.className.includes('bg-white') &&
        button.className.includes('txt-black') &&
        button.className.includes('button') &&
        button.innerHTML === 'Student'
    ).toBeTruthy();
});
