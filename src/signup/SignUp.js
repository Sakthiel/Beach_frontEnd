import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    makeStyles,
    FormControl,
    InputAdornment,
    IconButton,
    Snackbar
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useSignUp from './hooks/useSignUp';
import {useFormik} from 'formik';
import { formSchema } from './services/formValidationServices';
import signUpStyles from './styles/signUpStyles';


const SignUp = () => {
    const classes = signUpStyles();
    const{handleSignUp , errorMessage , initialValues , 
         showPassword , handleShowPassword, 
         showConfirmPassword , handleShowConfirmPassword} = useSignUp();

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit : handleSignUp,
        validationSchema:formSchema
    });

    return (<div>

        <Container component="main" maxWidth="xs" className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form data-testid="signup-form" className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            data-testid="name-input"
                            label="Name*"
                            variant="outlined"
                            fullWidth
                            name="name"
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            value = {formik.values.name}
                            error = {formik.touched.name && Boolean(formik.errors.name)}
                            helperText = {formik.touched.name && formik.errors.name}
                            
                           
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            data-testid="username-input"
                            label="Username*"
                            variant="outlined"
                            fullWidth
                            name="username"
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            value = {formik.values.username}
                            error = {formik.touched.username && Boolean(formik.errors.username)}
                            helperText = {formik.touched.username && formik.errors.username}
                          
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                            data-testid="phonenumber-input"
                            label="Phone Number*"
                            variant="outlined"
                            fullWidth
                            name="phoneNumber"
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            value = {formik.values.phoneNumber}
                            error = {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText = {formik.touched.phoneNumber && formik.errors.phoneNumber}
                          
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            data-testid="email-input"
                            label="Email*"
                            variant="outlined"
                            fullWidth
                            name="email"
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            value = {formik.values.email}
                            error = {formik.touched.email && Boolean(formik.errors.email)}
                            helperText = {formik.touched.email && formik.errors.email}
                           
                        />
                    </Grid>
                    <Grid item xs={12}>
                       
                            <TextField
                                data-testid="password-input"
                                label="Password*"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                name="password"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.password}
                                error = {formik.touched.password && Boolean(formik.errors.password)}
                                helperText = {formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                  
                    </Grid>
                    <Grid item xs={12}>
                       
                       <TextField
                           data-testid="confirmPassword-input"
                           label="Confirm Password*"
                           type={showConfirmPassword ? "text" : "password"}
                           variant="outlined"
                           fullWidth
                           name="confirmPassword"
                           onChange = {formik.handleChange}
                           onBlur = {formik.handleBlur}
                           value = {formik.values.confirmPassword}
                           error = {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText = {formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowConfirmPassword}>
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                       />
             
               </Grid>
                </Grid>
                <Button
                    data-testid="button"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Sign Up
                </Button>
                {errorMessage()}
            </form>
        </Container>
    </div>)
}
export default SignUp;