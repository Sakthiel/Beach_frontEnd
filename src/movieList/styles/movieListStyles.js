import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    movieList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    link: {
        textDecoration : "none",
        color: "black"

    },
    card: {
        width: '350px', // Three cards per row, minus margin
        height : '600px',
        margin: theme.spacing(1.5), // Adjust margin as needed
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        
        padding: theme.spacing(2),
        textAlign: 'center',
        boxSizing: 'border-box',
        // [theme.breakpoints.down('md')]: {
        //     width: 'calc(30% - 20px)', // Two cards per row on smaller screens
        //   },
        // [theme.breakpoints.down('sm')]: {
        //     width: 'calc(49% - 20px)', // Two cards per row on smaller screens
        //   },
       
        //   [theme.breakpoints.down('xs')]: {
        //     width : '100%', // Single card per row on extra-small screens
        //   },
          '&:hover': {
            transform : 'translateY(-5px)', // Lift the card 5 pixels on hover
            boxShadow : '0px 9px 12px rgba(0, 0, 0, 0.7)', // Increase box shadow on hover
          },
    },

      
}))