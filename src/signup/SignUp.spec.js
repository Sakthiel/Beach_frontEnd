import {render,screen ,act, waitFor} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import SignUp from "./SignUp";
import { when } from "jest-when";
import { formSchema , checkUsernameExists } from "./services/formValidationServices";
import useSignUp from "./hooks/useSignUp";
import user from "@testing-library/user-event";
import axios from "axios";

// jest.mock("./hooks/useSignUp", () => ({
//   __esModule: true,
//   default: jest.fn()
// }));

jest.mock("./services/formValidationServices", () => ({
  ...(jest.requireActual('./services/formValidationServices')),
  checkUsernameExists : jest.fn()
}));

describe("Basic functionality of signup component" , () => {
    const testHandleSignUp = jest.fn();
    const TestErrorComponent = () => <div/>;
    const testInitialValues = {
      name:'',
      username: '',
      email:'',
      phoneNumber:'', 
      password: '',
      confirmPassword:''
  };
    const testData = {
      name : "Sakthi" , 
      username : "Sakthi@123" ,
      email : "abc@gmail.com" , 
      phoneNumber : "1234567890" ,
      password : "Sakthi@123" ,
      confirmPassword : "Sakthi@123"  
    }

    beforeEach(() => {
   
      // useSignUp.mockReturnValue({
      //   handleSignUp : testHandleSignUp,
      //   errorMessage: () => <TestErrorComponent/>,
      //   initialValues : testInitialValues,
      //   showPassword : false,
      //   handleShowPassword : jest.fn(),
      //   showConfirmPassword : false,
      //   handleShowConfirmPassword : jest.fn()
      // })
      checkUsernameExists.mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
      });
    it("should render sign up form with all fields and button" , () => {
        const {getByTestId} = render(<Router> <SignUp></SignUp></Router>);
        screen.logTestingPlaygroundURL(); 
        const heading = screen.getByRole('heading', {
            name: /sign up/i
          })
        const nameInput = getByTestId('name-input');
        const usernameInput = getByTestId('username-input');
        const emailInput = getByTestId('email-input');
        const mobileNoInput = getByTestId('phonenumber-input');
        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirmPassword-input');
        const submitButton = screen.getByRole('button', {
            name: /sign up/i
          });

        expect(nameInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(mobileNoInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument(); 
        expect(heading).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    
});
describe('Validation Schema', () => {

    it('should show error message for empty name', async () => {
      await expect(formSchema.validateAt('name', '')).rejects.toThrow('Name is required');
    });

    it('should show error message for invalid username', async () => {
        await expect(formSchema.validateAt( 'username', '' ))
            .rejects.toThrow('Required');
      });

     it('should show error message for invalid mobile number', async () => {
    await expect(formSchema.validateAt('phoneNumber', '')).rejects.toThrow('Phone no is required');
  });

     it('should show error message for empty email', async () => {
    await expect(formSchema.validateAt('email', '')).rejects.toThrow('Email is required');
    });

    it('should show error message for short password', async () => {
        await expect(formSchema.validateAt('password', 'Pass1')).rejects.toThrow('Password is required');
      });
    
      it('should show error message for mismatched confirm password', async () => {
        const data = {
          password: 'Password123!',
          confirmPassword: 'Password321!'
        };
        await expect(formSchema.validateAt('confirmPassword', data)).rejects.toThrow("Password and confirm password don't match");
      });
});