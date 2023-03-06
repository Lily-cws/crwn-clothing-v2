import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
  const logGoogleUser =  async () => {
    const { user } = await signInWithGooglePopup();
    // console.log("Google response", user);
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log("Sign in page", userDocRef);
  };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
};

export default SignIn;
