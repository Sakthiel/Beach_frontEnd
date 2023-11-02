import styles from "./styles/headerStyles"
import { Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { isLoggedIn } from "../helper/authService";
import { Link } from "react-router-dom";
import useAuth from "../layout/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const classes = styles();
  const { handleLogout: onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  }
  return (<>
    <div className={classes.header}>
      <Link to="/" className={classes.headerLink}>
      <Typography variant="h5" >
        PulpTicket
      </Typography>
      </Link>

      {isLoggedIn() ?
        <div onClick={() => { handleLogout() }} className={classes.logoutLink}>
          <ExitToAppIcon />
          <Typography className={classes.headerLogo} variant="h6">
            Logout
          </Typography>
        </div> : " "
      }
    </div>

  </>)

}

export default Header;