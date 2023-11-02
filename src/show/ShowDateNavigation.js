import { useState } from "react";
import { Button, Typography, Box } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
const ShowDateNavigation = ({ movieId, selectedDate , navigate}) => {
    // const navigate = useNavigate();
    const startDate = new Date();
    const currentDate = new Date(selectedDate);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 6);

    const dateArray = [];

    const todayDateCopy = new Date(startDate);

    while (todayDateCopy <= endDate) {
        dateArray.push(new Date(todayDateCopy));
        todayDateCopy.setDate(todayDateCopy.getDate() + 1);
    }
    const handleDateClick = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        navigate(`/show/${movieId}/${formattedDate}`);
    };

    const handleBackward = () => {
        console.log("hi");
        const currentDateCopy = new Date(currentDate);
        currentDateCopy.setDate(currentDate.getDate() - 1);
        const formattedDate = currentDateCopy.toISOString().split('T')[0];
        navigate(`/show/${movieId}/${formattedDate}`);
    };

    const handleForward = () => {
        const currentDateCopy = new Date(currentDate);
        currentDateCopy.setDate(currentDate.getDate() + 1);
        const formattedDate = currentDateCopy.toISOString().split('T')[0];
        console.log(navigate);
        navigate(`/show/${movieId}/${formattedDate}`);
    };

    return (
        <Box display="flex" alignItems="center">
            <Button aria-label = "backward" variant="contained" color="primary"
                onClick={handleBackward}><ArrowBack />
            </Button>
            {dateArray.map((date) => (
                <Button color={date.getDate() == currentDate.getDate() ? "secondary" : "primary"}
                    variant={date.getDate() == currentDate.getDate() ? "contained" : "text"}
                    key={date.toDateString()}
                    onClick={() => handleDateClick(date)}
                    style={{ margin: '5px' }}>
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    
                </Button>
            ))}
            <Button
            aria-label = "forward"
             variant="contained"
                color="primary"
                onClick={handleForward}><ArrowForward /></Button>
        </Box>
    );
}
export default ShowDateNavigation;

