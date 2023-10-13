import {render , screen} from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from 'react-router-dom';
describe("Basic rendering of header component" , () => {
    it("should render the application name" , () => {
        render(<BrowserRouter><Header/></BrowserRouter>);
        
        expect(screen.getByText("PulpTicket"))
    })
})