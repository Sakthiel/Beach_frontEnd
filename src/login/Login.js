import {
    FormLabel, TextField, Button , Typography
} from "@material-ui/core";
import { useState } from "react";
import useAuth from "../layout/hooks/useAuth";
import useLogin from "./hooks/useLogin";
import { isLoggedIn } from "../helper/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const { handleLogin: onLogin } = useAuth();
    const { errorMessage, handleLogin } = useLogin(onLogin);
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassWord(e.target.value);
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ username, password });
        if (isLoggedIn()) {
            navigate("/");
            console.log("hai");
        }
    };

    return (<div style={{ textAlign: "center" }}>
        <Typography variant="h4" align="center"  style={{marginTop : '10px' , marginBottom : '10px'}}>
            Login
        </Typography>
        <form onSubmit={handleSubmit} data-testid="form">
            <div><TextField data-testid="username-input" variant="outlined" type="text" required margin="dense"
                label="Username"
                onChange={handleUserName}>

            </TextField>
            </div>

            <div>
                <TextField
                    data-testid="password-input"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    margin="dense"
                    type="password"
                    required
                    label="Password"
                    onChange={handlePasswordChange}
                >

                </TextField>
            </div>
            <div style={{ margin: "5px" }}>
                <Button color="primary" variant="contained" type="submit" >
                    Submit
                </Button>
            </div>
            {errorMessage()}
        </form>
        < div >
            <p>
                New to PulpTicket?{" "}
                <Link to="/signup">
                    SignUp here
                </Link>
            </p>
        </div>
    </div>)
}

export default Login;