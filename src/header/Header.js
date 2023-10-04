import styles from "./styles/headerStyles"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Header = () => {
  const classes = styles();
  return (<>
    <div className={classes.header}>
      <Typography variant="h5" >
        PulpTicket
      </Typography>
      <Link to="/show" className={classes.link}>
        <Typography variant="h5" >
          Show
        </Typography>
      </Link>
    </div></>)
}

export default Header;