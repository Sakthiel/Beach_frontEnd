import { makeStyles } from "@material-ui/core";

const signUpStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

export default signUpStyles;