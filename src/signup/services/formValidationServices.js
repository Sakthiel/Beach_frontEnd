import {object, string, ref} from "yup";
import axios from "axios";

export const initialValues = {
    name:'',
    username: '',
    email:'',
    phoneNumber:'', 
    password: '',
    confirmPassword:''
};

const getCharacterValidationError = (str) => {
    if(str === "special")
        return `Your password must have at least 1 of the special characters ( ! @ # % ^ & * )`;
    return `Your password must have at least 1 ${str} character`;
};

export const checkUsernameExists = async (username) => {
    const response = await axios.get(`http://localhost:8080/username?username=${username}`);
    const data = response.data;
    return data.isUsernameAvailable;
};


export const formSchema = object({

    name: string("Enter name")
    .required("Name is required"),

    username: string("Enter username")
        .required('Username is Required')
        .matches(/^[a-zA-Z$_][a-zA-Z0-9$_@]*$/, "Username must start with a letter, underscore (_), or dollar sign ($), cannot have spaces, and should not begin with a digit.")
        .test('checkUsername', 'Username already exists', async (value) => {
            const exists = await checkUsernameExists(value);
            return exists;  
            })
,
    phoneNumber: string("Enter mobile no")
        .required("Phone no is required")
        .matches(/^[1-9]\d{9}$/, "Enter a valid mobile number")
        .min(10,"Mobile no should have 10 digits")
        .max(10,"Mobile no should not exceed 10 digits"),

    email: string("Enter email")
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email Id'),

    password: string("Enter password")
        .required("Password is required")
        .min(8, "Password must have at least 8 characters")
        .max(64,"Password can have atmost 64 characters")
        
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[!@#%^&*]/, getCharacterValidationError("special")),


    confirmPassword: string("Re-enter password")
        .required("Confirm password is required")
        .oneOf([ref('password'), null], "Password and confirm password don't match"),

});