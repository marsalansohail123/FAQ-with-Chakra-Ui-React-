// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdRZAH43izp7qdUxyC7b60ucGxtHcaEBs",
    authDomain: "faq-with-chakra-ui.firebaseapp.com",
    projectId: "faq-with-chakra-ui",
    storageBucket: "faq-with-chakra-ui.appspot.com",
    messagingSenderId: "976966303763",
    appId: "1:976966303763:web:36b772261ddbd034f5ffe6",
    measurementId: "G-ER09CKMSYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;