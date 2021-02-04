import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = JSON.parse(process.env.REACT_APP_CONFIG || '{}');

export interface Firebase {
  auth: app.auth.Auth,
  storage: app.firestore.Firestore,
}
type FirebaseAPI = () => Firebase;

const firebase: FirebaseAPI = () => {
  app.initializeApp(config);
  const auth = app.auth();
  const storage = app.firestore();

  return {
    auth,
    storage,
  };
};

export default firebase();