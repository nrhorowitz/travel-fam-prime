import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAtrvGB8pwYWmyRwG02svHpAkh5QWzh9yk",
    authDomain: "travelfamprime.firebaseapp.com",
    databaseURL: "https://travelfamprime.firebaseio.com",
    projectId: "travelfamprime",
    storageBucket: "travelfamprime.appspot.com",
    messagingSenderId: "33000924700",
    appId: "1:33000924700:web:6a94b73ffb29331e"
};
const fire = firebase.initializeApp(config);
export default fire; 
