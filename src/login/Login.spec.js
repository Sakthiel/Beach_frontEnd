import { render, screen } from "@testing-library/react";
import {BrowserRouter as Router, useNavigate} from "react-router-dom"
import Login from "./Login";
import {when} from "jest-when";
import useAuth from "../layout/hooks/useAuth";
import useLogin from "./hooks/useLogin";
import user from "@testing-library/user-event"
import { isLoggedIn } from "../helper/authService";



jest.mock("../layout/hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./hooks/useLogin", () => ({
    __esModule: true,
    default: jest.fn()
}));

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'), 
//     useNavigate : jest.fn() 
//   }));

  jest.mock("../helper/authService", () => ({
    isLoggedIn: jest.fn()
}));

describe("Basic rendering of login component" , () => {
    const testOnLogin = jest.fn();
    const testHandleLogin = jest.fn();
    const navigate = jest.fn();
    const TestErrorComponent = () => <div/>;

    beforeEach(() => {
        useAuth.mockReturnValue({
            handleLogin : testOnLogin
        })    
        
        when(useLogin).calledWith(testOnLogin).mockReturnValue({
            errorMessage: () => <TestErrorComponent/>,
            handleLogin: testHandleLogin
        });

       
    });
    afterEach(() => {
        jest.clearAllMocks();
      });

    it("should render the all fields and button" , () => {
        render(<Router><Login></Login></Router>);
        screen.logTestingPlaygroundURL();

        const heading = screen.getByRole('heading', { name: /login/i });
        const usernameInput = screen.getByTestId("username-input");
        const passwordInput = screen.getByTestId("password-input");
        const button = screen.getByRole('button', { name: /submit/i });

        expect(heading).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

    });

    it("should calls handlelogin with given username and password on submit" , async () => {
        
        render(<Router><Login></Login></Router>);
        const usernameInput = screen.getByTestId("username-input").querySelector('input');
        const passwordInput = screen.getByTestId("password-input").querySelector('input');
        const button = screen.getByRole('button', { name: /submit/i });

        user.click(usernameInput);
        user.keyboard('testuser');
        user.click(passwordInput);
        user.keyboard('testuser');
        user.click(button);
        screen.debug();

        expect(testHandleLogin).toHaveBeenCalledWith({username:'testuser' , password : 'testuser'});
       

    });

    it("should navigate to home page after successful login" , async () => {
        isLoggedIn.mockReturnValue(true);
        render(<Router><Login></Login></Router>);
        const usernameInput = screen.getByTestId("username-input").querySelector('input');
        const passwordInput = screen.getByTestId("password-input").querySelector('input');
        const button = screen.getByRole('button', { name: /submit/i });

        user.click(usernameInput);
        user.keyboard('testuser');
        user.click(passwordInput);
        user.keyboard('testuser');
        user.click(button);
        screen.debug();

        expect(navigate).toHaveBeenCalledWith('/');
       

    });

})