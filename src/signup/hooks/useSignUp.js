import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const initialValues = {
        name:'',
        username:'',
        phoneNumber:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" style={{textAlign:"center" , marginTop:"5px"}} >
                    Sign Up failed
                </Typography>
            )
        }
    };

    const handleSignUp = async (values) => {
        console.log("hi");
        try{
            const payload = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                email: values.email,
                user: {
                    username: values.username,
                    password: values.password
                }
            }
            const response = await axios.post("http://localhost:8080/customer" , payload);
            console.log(response);  
            setShowError(false);   
            navigate("/login")  
        }
        catch(error){
            setShowError(true);
            console.log(error.response.data);
        }
    };

    return {
       errorMessage,
       handleSignUp,
       initialValues,
       showPassword,
       handleShowPassword,
       showConfirmPassword,
       handleShowConfirmPassword
    };
};