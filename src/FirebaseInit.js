import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCD_-j5sAv-5l2hFrwgmVW78cHdmd9WY3Y',
  authDomain: 'test-golbaus.firebaseapp.com',
  projectId: 'test-golbaus',
  storageBucket: 'test-golbaus.appspot.com',
  messagingSenderId: '978775356046',
  appId: '1:978775356046:web:e07b4533cf35ad01b2cfdf',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
