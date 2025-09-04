import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import OnboardingForm from './OnboardingForm';

describe('OnboardingForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows errors when fields are empty on submit', async () => {
        render(<OnboardingForm />);
        // Adjust selectors to match your actual input and button
        const submitButton = screen.getByRole('button', { name: /submit/i });
        
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid First Name')).toBeInTheDocument();
            expect(screen.getByText('Invalid Last Name')).toBeInTheDocument();
            expect(screen.getByText('Invalid Canadian Phone Number')).toBeInTheDocument();
            expect(screen.getByText('Invalid Corporation Number')).toBeInTheDocument();
        });
    });

    it('formats phone number with +1 prefix', async () => {
        render(<OnboardingForm />);
        const phoneInput = screen.getByLabelText(/phone number/i);
        
        await userEvent.type(phoneInput, '4161234567');

        await waitFor(() => {
            expect(phoneInput).toHaveValue('+14161234567');
        });
    });

    it('submits the form when all fields are valid', async () => {
        // Mock global fetch and alert
        window.alert = jest.fn();
        global.fetch = jest.fn((url) => {
            if (url.includes('corporation-number')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ valid: true }) });
            }
            if (url.includes('profile-details')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
            }
        }) as jest.Mock;

        render(<OnboardingForm />);

        const firstNameInput = screen.getByRole('textbox', { name: /first name \*/i});
        const lastNameInput = screen.getByRole('textbox', { name: /last name \*/i});
        const phoneInput = screen.getByRole('textbox', { name: /phone number \*/i });
        const corpInput = screen.getByRole('spinbutton', { name: /corporation number \*/i });
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(firstNameInput, 'Jane');
        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(phoneInput, '9055161757');
        await userEvent.type(corpInput, '123456789');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.queryByText('Invalid First Name')).not.toBeInTheDocument();
            expect(screen.queryByText('Invalid Last Name')).not.toBeInTheDocument();
            expect(screen.queryByText('Invalid Canadian Phone Number')).not.toBeInTheDocument();
            expect(screen.queryByText('Invalid Corporation Number')).not.toBeInTheDocument();

            expect(window.alert).toHaveBeenCalled();
        });
    });
});