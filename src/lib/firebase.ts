import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA49YwcXj7h_sN2hR9auaNf8G8jeDaJgHM',
  authDomain: 'wscontrol-bf552.firebaseapp.com',
  projectId: 'wscontrol-bf552',
  storageBucket: 'wscontrol-bf552.firebasestorage.app',
  messagingSenderId: '495792135553',
  appId: '1:495792135553:web:6e98c07931bc090b201c80',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
