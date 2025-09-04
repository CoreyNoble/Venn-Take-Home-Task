import { useState, useRef } from 'react';
import './OnboardingForm.scss'

function OnboardingForm() {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [corporationNumber, setCorporationNumber] = useState<string | null>(null);

    const [hasFirstNameError, setHasFirstNameError] = useState<boolean | null>(null);
    const [hasLastNameError, setHasLastNameError] = useState<boolean | null>(null);
    const [hasPhoneNumberError, setHasPhoneNumberError] = useState<boolean | null>(null);
    const [hasCorporationNumberError, setHasCorporationNumberError] = useState<boolean | null>(null);

    const phoneInputRef = useRef<HTMLInputElement>(null);

    const isValidFirstName = (name: string | null) => {
        if (!name) return false;
        return name.trim() !== '' && name.length <= 50;
    };

    const isValidLastName = (name: string | null) => {
        if (!name) return false;
        return name.trim() !== '' && name.length <= 50;
    };

    const isValidCanadianPhone = (phone: string | null) => {
        if (!phone) return false;
        // Remove spaces, dashes, parentheses
        let digits = phone.replace(/\D/g, '');
        // Require leading '1' for +1
        if (digits.length === 11 && digits.startsWith('1')) {
            digits = digits.slice(1);
        } else {
            // If not 11 digits starting with 1, invalid
            return false;
        }
        // Canadian phone: 10 digits, NXX-NXX-XXXX
        const canadianPhoneRegex = /^([2-9][0-9]{2})([2-9][0-9]{2})([0-9]{4})$/;
        return canadianPhoneRegex.test(digits);
    };

    const handlePhoneNumberPrefix = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement, Element>) => {
        let value = e.target.value.replace(/^\+?1?/, "").trim();
        value = "+1" + value;
        e.target.value = value;

        setPhoneNumber(value);
    }

    const isValidCorporationNumber = async (corporationNumber: string | null) => {
        if (!corporationNumber) return false;

        try {
            // Make the API call to validate the corporation number
            const response = await fetch(`https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${corporationNumber}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return true;
        } catch {
            return false;
        }
    }

    const isValidForm = async () => {
        // Validate all fields and store results in local variables
        const isFirstNameValid = isValidFirstName(firstName);
        const isLastNameValid = isValidLastName(lastName);
        const isPhoneNumberValid = isValidCanadianPhone(phoneNumber);
        const isCorporationNumberValid = await isValidCorporationNumber(corporationNumber);

        // Update error states for UI feedback
        setHasFirstNameError(!isFirstNameValid);
        setHasLastNameError(!isLastNameValid);
        setHasPhoneNumberError(!isPhoneNumberValid);
        setHasCorporationNumberError(!isCorporationNumberValid);

        // Use local variables for submission logic
        if (isFirstNameValid && isLastNameValid && isPhoneNumberValid && isCorporationNumberValid) {
            return true;
        }

        return false;
    };
    
    return (
        <>
            <h2>Onboarding Form</h2>
            <form
                noValidate
                onSubmit={async (e) => {
                    // Prevent default form submission behavior
                    e.preventDefault();

                    if (await isValidForm()) {
                        try {
                            // Make the API call to validate the corporation number
                            const response = await fetch('https://fe-hometask-api.qa.vault.tryvault.com/profile-details', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    firstName: firstName,
                                    lastName: lastName,
                                    phone: phoneNumber,
                                    corporationNumber: corporationNumber,
                                })});
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            alert('Form submitted successfully!');
                        } catch (error) {
                            alert('There was a problem submitting the form: ' + error);
                        }
                    }
                }}
                className="onboardingForm"
            >
                <div className="flex inputContainer nameFields">
                    <div className='firstName'>
                        <label htmlFor="firstName">First Name <span className="required">*</span></label>
                        <input
                            id="firstName"
                            type='text'
                            placeholder='Eg. Corey'
                            required
                            maxLength={50}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={(e) => setHasFirstNameError(!isValidFirstName(e.target.value))}
                        />
                        {hasFirstNameError && <p className="error">Invalid First Name</p>}
                    </div>
                    <div className='lastName'>
                        <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                        <input
                            id="lastName"
                            type='text'
                            placeholder='Eg. Noble'
                            required
                            maxLength={50}
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={(e) => setHasLastNameError(!isValidLastName(e.target.value))}
                        />
                        {hasLastNameError && <p className="error">Invalid Last Name</p>}
                    </div>
                </div>
                <div className="flex flexColumn inputContainer">
                    <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                    <input
                        id="phoneNumber"
                        ref={phoneInputRef}
                        type="tel"
                        required
                        pattern="^\+1\s?([2-9][0-9]{2})[\s\-]?([2-9][0-9]{2})[\s\-]?([0-9]{4})$"
                        placeholder='Eg. +19055161757'
                        // Ensure +1 prefix on focus
                        onFocus={handlePhoneNumberPrefix}
                        // Handles autofill and user input
                        onChange={handlePhoneNumberPrefix}
                        // Handles formatting on blur
                        onBlur={(e) => setHasPhoneNumberError(!isValidCanadianPhone(e.target.value))}
                    />
                    {hasPhoneNumberError && <p className="error">Invalid Canadian Phone Number</p>}
                </div>
                <div className="flex flexColumn inputContainer">
                    <label htmlFor="corporationNumber">Corporation Number <span className="required">*</span></label>
                    <input
                        id="corporationNumber"
                        type='number'
                        required
                        placeholder='Eg. 123456789'
                        min={1}
                        maxLength={9}
                        onChange={(e) => setCorporationNumber(e.target.value)}
                        onBlur={(e) => setHasCorporationNumberError(!isValidCorporationNumber(e.target.value))}
                    />
                    {hasCorporationNumberError && <p className="error">Invalid Corporation Number</p>}
                </div>
                <div className="flex flexColumn inputContainer">
                    <button type="submit">
                        Submit
                        {/* ArrowRight Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3">
                            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                        </svg>
                    </button>
                </div>
            </form>
        </>
    );
}

export default OnboardingForm
