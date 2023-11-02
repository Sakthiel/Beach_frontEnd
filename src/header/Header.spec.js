import {render , screen} from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from 'react-router-dom';
import { isLoggedIn} from "../helper/authService";
import useAuth from "../layout/hooks/useAuth";
import user from "@testing-library/user-event";

jest.mock("../helper/authService", () => ({
    isLoggedIn: jest.fn()
}));

jest.mock("../layout/hooks/useAuth" ,  () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("Basic rendering of header component" , () => {
    const testHandleLogout = jest.fn();
    beforeEach(() => {
        useAuth.mockReturnValue({
            handleLogout : testHandleLogout
        });
      
    })
    it("should render the application name" , () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        
        expect(screen.getByText("PulpTicket"))
    });

    it("should render the link to the home page" , () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        const link = screen.getByRole('link',{
            name : /pulpticket/i
        })

        expect(link).toHaveAttribute('href' , '/');
    });
    it("should render the logout text if logged in " , () => {
        isLoggedIn.mockReturnValue(true);
        render(<BrowserRouter><Header/></BrowserRouter>);
        
        const logoutComponent = screen.getByText("Logout");

        expect(logoutComponent).toBeInTheDocument();

    });
    it("should call handleLogout when logout is clicked " , () => {
        isLoggedIn.mockReturnValue(true);
        render(<BrowserRouter><Header/></BrowserRouter>);
        const logoutComponent = screen.getByText("Logout");
        
        user.click(logoutComponent);
        
        expect(testHandleLogout).toBeCalled();
    });

})