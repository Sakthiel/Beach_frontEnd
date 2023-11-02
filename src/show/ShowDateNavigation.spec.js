import ShowDateNavigation from "./ShowDateNavigation";
import {render , screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import user from "@testing-library/user-event";

describe("Basic functionality of the component" , () => {
    it("should render the buttons of today date and next six days",() => {
        render(<Router><ShowDateNavigation/></Router>);
        screen.logTestingPlaygroundURL();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 6);
    
        const dateArray = [];
    
        const todayDateCopy = new Date(startDate);
    
        while (todayDateCopy <= endDate) {
            dateArray.push(new Date(todayDateCopy));
            todayDateCopy.setDate(todayDateCopy.getDate() + 1);
        }

        for(const date of dateArray){
            const button = screen.getByText(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            expect(button).toBeInTheDocument();
        }
    });

    it("should render the forward and backward icons" , () => {
        render(<Router><ShowDateNavigation/></Router>);

        const backwardButton = screen.getByRole('button' , {name : 'backward'});
        const forwardButton = screen.getByRole('button' , {name : 'forward'});

        expect(backwardButton).toBeInTheDocument();
        expect(forwardButton).toBeInTheDocument();
    });

    it("should call navigate with next date when forward icon clicked" , () => {
        const testNavigate = jest.fn();
        const currentDateCopy = new Date();
        currentDateCopy.setDate(currentDateCopy.getDate() + 1); 
        const formattedDate = currentDateCopy.toISOString().split('T')[0];
        const movieId = "kdf123"
        render(<Router><ShowDateNavigation navigate={testNavigate} movieId = {movieId} selectedDate={new Date()}/></Router>);

        const backwardButton = screen.getByRole('button' , {name : 'backward'});
        const forwardButton = screen.getByRole('button' , {name : 'forward'});
        user.click(forwardButton);
        
        expect(testNavigate).toHaveBeenCalledWith(`/show/${movieId}/${formattedDate}`); 
    });
})