import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import "../sign-up-form/sign-up-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Destructure formFields
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})
  };

  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   console.log(response);
  //   if(response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //
  //   }
  // },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("Sign in event", event);

    try {
      const response =  await signInAuthUserWithEmailAndPassword(email,password);
      resetFormFields();
      // console.log("response sign in with email and password", response);

    }catch(error){
      // if(error.code === "auth/wrong-password") {
      //   alert("Incorrect password for email");
      // } else if (error.code === "auth/user-not-found") {
      //   alert("Incorrect email");
      // } else {
      //   console.log("User SignIn encountered an error",error);
      // }
      // use Switch for the above if else statement
      switch(error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log("User SignIn encountered an error",error);
      }
      // console.log("error.code", error.code);
      // console.log("error.message", error.message);
    }
  };


  const SignInWithGoogle =  async () => {
    const { user } = await signInWithGooglePopup();
    // console.log("Google response", user);
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log("Sign in page", userDocRef);
  };

  // console.log("formFields", formFields);

  return (
     <div className="sign-up-container">
       <h2>I already have an account</h2>
       <span>Sign in with your email and password</span>
       {/*<button onClick={logGoogleUser}>Sign in with Google Popup</button>*/}
       <form onSubmit={handleSubmit}>
         <FormInput
           label="Email"
           type="email"
           required
           onChange={handleChange}
           name="email"
           value={email}
         />
         <FormInput
           label="Password"
           type="password"
           required
           onChange={handleChange}
           name="password"
           value={password}
         />
         <div className="buttons-container">
           <Button type="submit">SIGN IN</Button>
           <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
             GOOGLE SIGN IN
           </Button>
         </div>
       </form>

     </div>
   )
};

export default SignInForm;
