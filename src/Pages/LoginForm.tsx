import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateEmail,validatePassword } from '../Utils/validation';
import { Body } from '../Layouts/Forms/templates';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [apiError, setApiError] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //get the email input from the form and sent it to validation, if the input not validated - a relevant error meesage will return
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setEmailError(validateEmail(emailValue));
    };

    //get the password input from the form and sent it to validation, if the input not validated - a relevant error meesage will return
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        setPasswordError(validatePassword(passwordValue));
    };

    React.useEffect(() => {
        setFormValid(!emailError && !passwordError && email!='' && password!=''); // check if all the input are set and without validate error
    }, [emailError, passwordError, email, password]);

    //make the login reqeset
    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true); // set loading to the submit button
        
            const response = await fetch('https://localhost:7095/api/User/Login', {
                method: 'POST',
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            setResponse(responseBody);
            const { token } = responseBody;
            localStorage.setItem('token', token); // store the token in localStorage
            localStorage.setItem('details', JSON.stringify(responseBody.personalDetails)); // store the personal detials in localStorage
            navigate('/info'); //route to the info page*/
        }
          
        else {
            console.log("here");
            const errorResponse = await response.json();
            const errorMessage = errorResponse.error;
            console.log(errorMessage);
            setApiError(errorMessage);
        }
        setLoading(false); //disable the  loading to the submit button
    };

    return (
        <Body>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                            <input type='email' value={email} onChange={handleEmailChange} 
                                onBlur={() => setEmailTouched(true)} className='form-control' />
                            {emailTouched && emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                        
                                <div className='form-group mb-3'>
                                    <label>Password</label>
                            <input type='password' value={password} onChange={handlePasswordChange}
                                onBlur={() => setPasswordTouched(true)} className='form-control' />
                            {passwordTouched && passwordError && <div className="text-danger">{passwordError}</div>} 
                        </div>
                        
                        <div className='form-group mb-3 text-center'>
                            <button type='submit' className='btn btn-primary' disabled={!formValid || loading}>
                        {loading ? 'Loading...' : 'Sign In'}</button>
                    {apiError && <div className="text-danger">{apiError}</div>} 
                                </div>
            </form>
        </Body>
    );
};

export default LoginForm;

export {};
