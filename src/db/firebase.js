import { initializeApp } from 'firebase/app';
import {
    getDatabase, set, ref, onValue,
} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD6qHRz3ron9zDsUv_ydJInPIy8LXVKo-M',
    authDomain: 'tic-tac-toe-91656.firebaseapp.com',
    databaseURL: 'https://tic-tac-toe-91656-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'tic-tac-toe-91656',
    storageBucket: 'tic-tac-toe-91656.appspot.com',
    messagingSenderId: '828561504456',
    appId: '1:828561504456:web:2c1a2c779b78559ea2cdfd',
};

const DB_NAME = 'tic-tac-toe';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function writeToDb(state) {
    set(ref(db, `${DB_NAME}/latest`), state);
}


export function watchChanges() {
    const tictacRef = ref(db, `${DB_NAME}/latest`);
    
    onValue(tictacRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}