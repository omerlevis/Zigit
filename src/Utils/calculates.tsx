import { isEmail } from 'validator';

export const validateEmail = (email: string) => {
    if (!isEmail(email)) {
        return 'Please enter a valid email address';
    } else {
        return '';
    }
};

export const validatePassword = (password: string) => {
    if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
        return 'Password should be at least 8 characters long, contain at least 1 numeric character, and at least 1 capital letter.';
    } else {
        return '';
    }
};