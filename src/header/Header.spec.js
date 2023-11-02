import {render , screen} from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from 'react-router-dom';
describe("Basic rendering of header component" , () => {
    it("should render the application name" , () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        
        expect(screen.getByText("PulpTicket"))
    })

    it("should render the link to the home page" , () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        const link = screen.getByRole('link',{
            name : /pulpticket/i
        })

        expect(link).toHaveAttribute('href' , '/');
    })
})