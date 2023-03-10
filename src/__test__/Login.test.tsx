import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/SignCard/LoginCard';
import colors from '../styles/colors';
import { ThemeProvider } from 'styled-components';

describe('Login Test', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={colors}>
        <Login />
      </ThemeProvider>,
    );
  });

  it('Rendering Test', () => {
    const idInput = screen.getByTestId('id-input');
    expect(idInput).toBeInTheDocument();

    const pwInput = screen.getByTestId('pw-input');
    expect(pwInput).toBeInTheDocument();

    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();
  });

  it('handleInputs Test', () => {
    const idInput = screen.getByTestId('id-input');
    fireEvent.change(idInput, { target: { value: 'bwj0509' } });
    expect((idInput as HTMLInputElement).value).toBe('bwj0509');

    const pwInput = screen.getByTestId('pw-input');
    fireEvent.change(pwInput, { target: { value: '1q2w3e4r!' } });
    expect((pwInput as HTMLInputElement).value).toBe('1q2w3e4r!');
  });

  it('handleShowPassword Test', () => {
    const eyeSvg = screen.getByTestId('eye-svg');
    const pwInput = screen.getByTestId('pw-input');
    fireEvent.click(eyeSvg);
    expect((pwInput as HTMLInputElement).type).toBe('text');
    fireEvent.click(eyeSvg);
    expect((pwInput as HTMLInputElement).type).toBe('password');
  });
});
