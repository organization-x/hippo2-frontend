import { render, screen } from '@testing-library/react';
import Input from './input.js';

test('valid input test', () => {
    render(
        <Input label='First Name' placeHolder='John' type='text' isValid='true' errorText='invalid'></Input>
    );
    const input = screen.getByRole('textbox', { placeholder: 'John' });
    expect(
        input.className.includes('input') &&
        input.type.includes('text') &&
        input.value.includes('')
    );
});

test('invalid input test', () => {
    render(
        <Input label='First Name' placeHolder='John' type='text' isValid='false' errorText='invalid'></Input>
    );
    const input = screen.getByRole('textbox', { placeholder: 'John' });
    expect(
        input.className.includes('invalid-border') &&
        input.type.includes('text') &&
        input.value.includes('')
    ).toBeTruthy();
});
