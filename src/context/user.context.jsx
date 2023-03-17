import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value that you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// as the provider , the actual component
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] =useState(null);
  const value = {currentUser, setCurrentUser};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log("onAuthStateChanged Listener user", user)
    });

    // clean up onAuthStateChangedListener to avoid memory leak
    return unsubscribe;
  },[]);

  return<UserContext.Provider value={value}>{children}</UserContext.Provider>
}
