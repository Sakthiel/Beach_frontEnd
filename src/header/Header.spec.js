import {render , screen} from "@testing-library/react";
import Header from "./Header";
describe("Basic rendering of header component" , () => {
    it("should render the application name" , () => {
        render(<Header/>);
        
        expect(screen.getByText("PulpTicket"))
    })
})