import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

var firstName = "";
var lastName = "";

export default function CreateNameEmail(props) {
  const classes = useStyles();
  function handleChangeFirstName(e) {
     firstName = e.target.value;
  }
  function handleChangeLastName(e) {
     lastName = e.target.value;
  }
  function next() {
      if (validNames()) {
          props.addNewUserInfo(["firstName", firstName]);
          props.addNewUserInfo(["lastName", lastName]);
          props.segueToView("CreatePasswordView")
      }
  }
  function validNames() {
      return true; //TODO: ADD CONDITIONS
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          What's your name?
        </Typography>
        <form className={classes.form} onSubmit={next} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            onChange={handleChangeFirstName}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              onChange={handleChangeLastName}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SIGN UP
          </Button>
        </form>
        <Typography component="h1" variant="h5">
          Please use your full and real name!
        </Typography>
        <Typography component="h1" variant="h6">
          Our community is built on civility and real identity. No fake names please.
        </Typography>
      </div>
    </Container>
  );
}
