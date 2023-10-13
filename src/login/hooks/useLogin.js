import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
export default (onLogin) => {
    const [showError, setShowError] = useState(false);
    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" >
                    Login failed
                </Typography>
            )
        }
    };

    const handleLogin = async (values) => {
        const {username, password} = values;
        try {
            await onLogin(username, password);
            setShowError(false);
         
        } catch (err) {
            if (err.response ) {
                setShowError(true);
            } else {
                throw err;
            }
        }
    };

    return {
        errorMessage: errorMessage,
        handleLogin: handleLogin
    };
};