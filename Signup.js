import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { auth } from '../Firebase/FirebaseConfig'
import "../Signup/Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const confirmpasswordInputRef=useRef();
  const[signupMessage,setSignupMessage]=useState(null);

  const signupHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    const confirmenteredPassword=confirmpasswordInputRef.current.value;
    
    
    console.log(enteredEmail+" "+enteredPassword+' '+confirmenteredPassword);
    if(enteredPassword!==confirmenteredPassword){
      setSignupMessage("Password and confirm password doesn't match");
    }
    else{

      createUserWithEmailAndPassword(auth,enteredEmail,enteredPassword,confirmenteredPassword).then((response)=>{
        setSignupMessage("Signup Successfull")
      }).catch((error)=>{
        setSignupMessage(error.message);
        console.log("Error"+''+error.message);
      });
    }
    }
    setTimeout(() => {
      setSignupMessage(null);
    }, 4000);
  return (
    <div className="signup">
      
       
        <form className="signup-form">
        <label htmlFor="email">Email</label>
            <input type="text" className="input-box" ref={emailInputRef}/>
            <label htmlFor="email">Password</label>
            <input type="password" className="input-box" ref={passwordInputRef}/>
            <label htmlFor="password">Confirm Password</label>
            <input type="password" className="input-box" ref={confirmpasswordInputRef}/>
            <p><span><input type="checkbox" /></span>I agree to the terms of services</p>
            <div style={{color:'red'}}>{signupMessage}</div>
            <button className="signupbutton" onClick={signupHandler}>SIGN UP</button>
            <hr />
            <div className="or">OR</div>
       
            <div>Already Have An Acount?<Link to='/Login'>LOGIN</Link></div>
            
            
        </form>
    </div>
  );
};

export default Signup;
