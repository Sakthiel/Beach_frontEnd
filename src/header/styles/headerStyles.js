import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    header: {
        backgroundColor: '#323',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerLink: {
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: "flex-start",
        textDecoration: 'none'
    },
      logo: {
        height: '50px',
      },
      nav: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
      },
      navItem: {
        marginRight: '20px',
      },
      link: {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 'bold',
      },
      linkHover: {
        color: '#ff5733',
      },
      logoutLink: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        marginLeft: "15px"
    }
}))