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

var phone = "";
var phoneError = true;

export default function SignIn(props) {
  const classes = useStyles();

  function sendPhone(e) {
    e.preventDefault();
    if (validPhone(phone)) {
        props.sendPhone(phone);
    } else {
        phoneError = true;
        //this.forceUpdate();
        alert("please enter a valid phone number"); //THIS IS SUS (change with component function?)
    }
  }
  function validPhone(num) {
      return /^\d+$/.test(num);
  }
  function handleChange(e) {
     phone = e.target.value;
  }
  function textField(error) {
      if (error) {
          return <TextField
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="Phone"
            autoComplete="phone"
            autoFocus
            onChange={handleChange}
          />;
      } else {
          return <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="Phone"
            autoComplete="phone"
            autoFocus
            onChange={handleChange}
          />;
      }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please enter your phone number to continue
        </Typography>
        <form className={classes.form} onSubmit={sendPhone} noValidate>
          {textField(phoneError)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            NEXT
          </Button>
        </form>
      </div>
    </Container>
  );
}
