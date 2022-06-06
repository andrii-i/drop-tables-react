import React, { useContext, createContext, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, signInWithGoogle, signInWithFacebook } from '../firebase';

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signInGoogle() {
    return signInWithGoogle().then((user) => console.log(user));
  }

  function signout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInGoogle,
    signout,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  );

}
export default function authContext() {
  return (
  <div>authContext</div>
  )
}
