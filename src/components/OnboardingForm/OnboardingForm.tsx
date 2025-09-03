import { useState } from 'react';
import './OnboardingForm.scss'
import ArrowRight from '../../assets/svg/arrow-right.svg';

function OnboardingForm() {
    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
    const [corporationNumber, setCorporationNumber] = useState<string | undefined>();

    return (
        <>
            <h1>Onboarding Form</h1>
            <form className="onboardingForm">
                <div className="flex inputContainer nameFields">
                    <div className='firstName'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            name="firstName"
                            type='text'
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </div>
                    <div className='lastName'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            name="lastName"
                            type='text'
                            onChange={(e) => {
                            setLastName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="flex flexColumn inputContainer">
                   <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        name="phoneNumber"
                        type='text'
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                    /> 
                </div>
                <div className="flex flexColumn inputContainer">
                    <label htmlFor="corporationNumber">Corporation Number</label>
                    <input
                        name="corporationNumber"
                        type='text'
                        onChange={(e) => { setCorporationNumber(e.target.value); }}
                    />
                </div>
                <div className="flex flexColumn inputContainer">
                    <button onClick={() => {
                        alert(`First Name: ${firstName}, Last Name: ${lastName}, Phone Number: ${phoneNumber}, Corporation Number: ${corporationNumber}`)
                    }}>Submit <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></button>
                </div>
            </form>
        </>
    );
}

export default OnboardingForm
