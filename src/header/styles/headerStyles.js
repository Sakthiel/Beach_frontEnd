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
      }
}))