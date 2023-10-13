import { makeStyles } from "@material-ui/core";

const showStyles = makeStyles((theme) => ({
    card: {
        width: '250px', // Three cards per row, minus margin
        height : '350px',
        margin: theme.spacing(1.5), // Adjust margin as needed
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        
        padding: theme.spacing(2),
        textAlign: 'center',
        boxSizing: 'border-box'
    },
    movieInfoContainer: {
        display : "flex",
        marginTop : "16px",
        backgroundColor : "#f9f8fd"
    },

    showList: {
    display: 'flex',
    flexDirection: 'column',
  },
  screenShows: {
    display: 'flex',
    marginBottom: 20,
    marginTop: 20,
    '&:hover': {
      backgroundColor: '#f9f8fd',
    },
  },
  screenName: {
    flex: 1,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
  },
  showTimings: {
    display: 'flex',
    flex: 3,
    listStyle: 'none',
    padding: 0,
  },
  showItem: {
    border: '1px solid #ddd',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
}));

export default showStyles;
