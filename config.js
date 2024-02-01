import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAC8F5LNUbBSU09lZqs4t3zv37FCl9t9uM",
  authDomain: "mobile-app-6d370.firebaseapp.com",
  projectId: "mobile-app-6d370",
  storageBucket: "mobile-app-6d370.appspot.com",
  messagingSenderId: "937407878009",
  appId: "1:937407878009:web:75d860796f3b1a65a455a8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
