import {act, renderHook} from "@testing-library/react-hooks";
import useSignUp from "./useSignUp";
import React from "react";
import {when} from "jest-when";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock("axios", () => ({
    post: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockNavigate
}))

describe("Basic Logic" , () => {
    
    const signUpValues = {
        name:"Sakthi",
        username:"Sakthi@123",
        phoneNumber:"1234567890",
        email:"abc@gmail.com",
        password:"Sakthi@123",
        confirmPassword:"Sakthi@123"
    };

    const payload = {
        name:"Sakthi",
        phoneNumber : "1234567890",
        email:"abc@gmail.com",
        user : {
            username : "Sakthi@123",
            password :"Sakthi@123"
        }

    }

    it("should initially not show error message", () => {
        const renderHookResult = renderHook(() => useSignUp());
        const result = renderHookResult.result;
        const {errorMessage} = result.current;

        expect(errorMessage()).toBe(undefined);
    });

    it("should initialise showPassword and showConfirmPassword to false" , () => {
        const { result } = renderHook(() => useSignUp());
    
        const { showPassword , showConfirmPassword } = result.current;

        expect(showPassword).toBe(false);
        expect(showConfirmPassword).toBe(false);
    });

    it("should not show error message if signed in succesfully", async () => {
        when(axios.post)
            .calledWith(`http://localhost:8080/customer`,payload)
            .mockResolvedValue("unused");
        const {result} = renderHook(() => useSignUp());
        
        const {handleSignUp} = result.current;

        await act(() => handleSignUp(signUpValues));

        const {errorMessage} = result.current;
        expect(errorMessage()).toBe(undefined);
    });

    it("should update showPassword and showConfirmPassword state", async () => {
        const {result , waitForNextUpdate} = renderHook(() => useSignUp());
        
        const {handleShowPassword , handleShowConfirmPassword} = result.current;

        handleShowPassword();
        handleShowConfirmPassword();
        waitForNextUpdate();

        const {showPassword , showConfirmPassword} = result.current;
        expect(showPassword).toBe(true);
        expect(showConfirmPassword).toBe(true);
    });




  
})