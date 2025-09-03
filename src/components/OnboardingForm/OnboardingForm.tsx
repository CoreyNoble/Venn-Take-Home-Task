import { useState, useEffect } from 'react';
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

    useEffect(() => {
        isValidFirstName(firstName);
    }, [firstName]);

    useEffect(() => {
        isValidLastName(lastName);
    }, [lastName]);

    useEffect(() => {
        isValidCanadianPhone(phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
    }, [corporationNumber]);

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

        const canadianPhoneRegex = /^([2-9][0-9]{2})([2-9][0-9]{2})([0-9]{4})$/; // NXX-NXX-XXXX format for Canada
        const digits = phone.replace(/\D/g, ''); // Remove non-digit characters

        return canadianPhoneRegex.test(digits);
    };

    const isValidCorporationNumber = (corporationNumber: string | null) => {
        if (!corporationNumber) return false;

        const corporationNumberRegex = /^\d{9}$/; // Exactly 9 digits

        return corporationNumberRegex.test(corporationNumber);
    }

    const isValidForm = () => {
        // Validate all fields and store results in local variables
        const isFirstNameValid = isValidFirstName(firstName);
        const isLastNameValid = isValidLastName(lastName);
        const isPhoneNumberValid = isValidCanadianPhone(phoneNumber);
        const isCorporationNumberValid = isValidCorporationNumber(corporationNumber);

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
            <h1>Onboarding Form</h1>
            <form
                noValidate
                onSubmit={(e) => {
                    // Prevent default form submission behavior
                    e.preventDefault();

                    if (isValidForm()) {
                        alert('Form submitted successfully!');
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
                            onBlur={(e) => {
                                setFirstName(e.target.value);
                                setHasFirstNameError(!isValidFirstName(e.target.value));
                            }}
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
                            onBlur={(e) => {
                                setLastName(e.target.value);
                                setHasLastNameError(!isValidLastName(e.target.value));
                            }}
                        />
                        {hasLastNameError && <p className="error">Invalid Last Name</p>}
                    </div>
                </div>
                <div className="flex flexColumn inputContainer">
                    <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder='Eg. 9055161757'
                        onBlur={(e) => {
                            setPhoneNumber(e.target.value);
                            setHasPhoneNumberError(!isValidCanadianPhone(e.target.value));
                        }}
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
                        onBlur={(e) => {
                            setCorporationNumber(e.target.value);
                            setHasCorporationNumberError(!isValidCorporationNumber(e.target.value));
                        }}
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
