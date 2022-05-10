import Router from 'next/router';
import { createContext, useEffect, useState } from 'react';
import firebase from '../config/firebaseClient';

type AuthContextType = {
  user: null | firebase.User;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(setUser);

    return () => unsubscribe();
  });

  const signUp = (email: string, password: string) => {
    try {
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          Router.push('/dashboard');
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmailAndPassword = (email: string, password: string) => {
    try {
      setLoading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          Router.push('/dashboard');
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const signIn = () => {
    try {
      setLoading(true);
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then((response) => {
          setUser(response.user);
          Router.push('/dashboard');
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    try {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
          Router.push('/');
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        signUp,
        signInWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
