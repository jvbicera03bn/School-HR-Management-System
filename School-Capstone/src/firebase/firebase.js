
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAlzKS8sI-IIkd4rS_4XXCFeTiDj5TX2Jw",
    authDomain: "ahrms-3d987.firebaseapp.com",
    projectId: "ahrms-3d987",
    storageBucket: "ahrms-3d987.appspot.com",
    messagingSenderId: "773854087483",
    appId: "1:773854087483:web:85bfd672bcf7c730a88f1e",
    measurementId: "G-YZ0VREG7SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
/* const analytics = getAnalytics(app); */