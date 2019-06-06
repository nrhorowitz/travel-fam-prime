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

import firebase from 'firebase';
import 'firebase/auth';

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

const db = firebase.firestore();

var password = "";

export default function LoginWithPassword(props) {
  const classes = useStyles();
  function handleChangePassword(e) {
     password = e.target.value;
  }
  function next() {
      if (validInput()) {
          db.collection('users').get().then((snapshot) => {
              snapshot.forEach((doc) => {
                  if ((doc.data().id == props.id) && (doc.data().password == password)) {
                      //FIREBASE FORCE LOGIN with credential
                      alert(doc.data().id);
                      var credential = doc.data().credential;
                      firebase.auth().signInWithCredential(credential);
                      //TODO: not scalable brute force O(n) method, change later
                      props.segueToView("DashBoardView"); //TODO: does this happen anyways
                      return;
                  }
              });
          }).catch((err) => {
              console.log('Error getting documents', err);
          });
      }
  }
  function validInput() {
      return true; //TODO: ADD CONDITIONS
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          So that we can contact you...
        </Typography>
        <Typography component="h1" variant="h4">
          LOGIN WITH PASSWORD
        </Typography>
        <form className={classes.form} onSubmit={next} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              onChange={handleChangePassword}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </Container>
  );
}
