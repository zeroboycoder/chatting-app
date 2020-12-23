import React, { Component } from "react";
import { connect } from "react-redux";
import "./Signup.css";
import { AuthInput, AuthBtn } from "../../../components/Auth/Auth";
import signup_bg from "../../../asset/signup_bg.svg";
import { checkValidation, canClickBtn } from "../../../util/helper";
import { onSignUp } from "../../../store/action/rootAction";

class Signup extends Component {
   state = {
      signup_form: {
         name: {
            config: {
               type: "text",
               placeholder: "Your Name",
            },
            validation: {
               isRequired: true,
            },
            errMsg: "Username is required",
            icon: <i className="far fa-user"></i>,
            value: "",
            touched: false,
            isValid: false,
         },
         email: {
            config: {
               type: "email",
               placeholder: "Email",
            },
            validation: {
               isRequired: true,
               isEmail: true,
            },
            errMsg: "Email isn't valid",
            icon: <i className="far fa-envelope"></i>,
            value: "",
            touched: false,
            isValid: false,
         },
         password: {
            config: {
               type: "password",
               placeholder: "Password",
            },
            validation: {
               isRequired: true,
               minLength: 8,
            },
            errMsg: "Password must have minimum 8 characters",
            icon: <i className="fas fa-lock"></i>,
            value: "",
            touched: false,
            isValid: false,
         },
         c_password: {
            config: {
               type: "password",
               placeholder: "Confirm Password",
            },
            validation: {
               isRequired: true,
               isMatch: true,
            },
            errMsg: "Password doesn't match",
            icon: <i className="fas fa-lock"></i>,
            value: "",
            touched: false,
            isValid: false,
         },
      },
   };

   toSignIn = () => {
      this.props.history.push("/signin");
   };

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updateForm = { ...this.state.signup_form };
      updateForm[key].value = value;
      updateForm[key].touched = true;
      updateForm[key].isValid = checkValidation(
         value,
         updateForm[key].validation,
         this.state.signup_form
      );
      this.setState({ signup_form: updateForm });
   };

   submitHandler = () => {
      const data = {};
      for (const key in this.state.signup_form) {
         data[key] = this.state.signup_form[key].value;
      }
      this.props.onSignUp(data, this.props);
   };

   render() {
      // For Inputs
      const inputs = [];
      for (const key in this.state.signup_form) {
         inputs.push(
            <AuthInput
               key={key}
               label={key}
               config={this.state.signup_form[key].config}
               icon={this.state.signup_form[key].icon}
               value={this.state.signup_form[key].value}
               errMsg={this.state.signup_form[key].errMsg}
               valid={this.state.signup_form[key].isValid}
               touched={this.state.signup_form[key].touched}
               changed={this.inputChangeHandler}
            />
         );
      }

      // For Button
      const btn = (
         <AuthBtn
            btnname="SIGN UP"
            canClick={canClickBtn(this.state.signup_form)}
            clicked={this.submitHandler}
         />
      );

      // Go to Sign In page
      const swapAuth = (
         // SwapAuthBtn -> App.css
         <p className="text-md tracking-wide">
            Already accound?{" "}
            <span className="SwapAuthBtn" onClick={this.toSignIn}>
               Sign In
            </span>
         </p>
      );

      return (
         <div className="Signup flex h-screen">
            <div className="Signup_Left w-3/5 flex flex-col justify-center items-center">
               <p className="text-white font-bold text-center">
                  Connect with your <br />
                  loved ones
               </p>
               <div className="Signup_Bg mt-6">
                  <img src={signup_bg} alt="Sign Up Vector" />
               </div>
            </div>
            <div className="Signup_Right w-2/5 bg-gray-50 flex flex-col justify-center items-center">
               <h1 className="my-1 text-4xl">Welcome</h1>
               <p className="mb-2 text-base text-gray-500">
                  Start your communication
               </p>
               {inputs}
               {btn}
               {swapAuth}
            </div>
         </div>
      );
   }
}

const dispatchToProps = (dispatch) => {
   return {
      onSignUp: (data, props) => dispatch(onSignUp(data, props)),
   };
};

export default connect(null, dispatchToProps)(Signup);
