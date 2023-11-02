import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAwpyYWcZodlxNuNK_k5XiJ7rci2zcc8DM',
  authDomain: 'story-app-200.firebaseapp.com',
  projectId: 'story-app-200',
  storageBucket: 'story-app-200.appspot.com',
  messagingSenderId: '17812360103',
  appId: '1:17812360103:web:f8d2e65e3a69a72aa38482',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
