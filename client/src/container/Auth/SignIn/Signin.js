import React, { Component } from "react";
import { connect } from "react-redux";
import "./Signin.css";
import FacebookLogin from "react-facebook-login";
import signin_bg from "../../../asset/signin_bg.svg";
import { AuthInput, AuthBtn } from "../../../components/Auth/Auth";
import { checkValidation, canClickBtn } from "../../../util/helper";
import { onSignin } from "../../../store/action/rootAction";

class SignIn extends Component {
   state = {
      signin_form: {
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
      },
   };

   componentDidMount() {
      this.setState({ fbLogin: false });
   }

   inputChangeHandler = (event, key) => {
      const value = event.target.value;
      const updateForm = { ...this.state.signin_form };
      updateForm[key].value = value;
      updateForm[key].touched = true;
      updateForm[key].isValid = checkValidation(
         value,
         updateForm[key].validation,
         this.state.signin_form
      );
      this.setState({ signin_form: updateForm });
   };

   submitHandler = () => {
      const data = {
         email: this.state.signin_form.email.value,
         password: this.state.signin_form.password.value,
      };
      this.props.onSignin(data, "normal", this.props);
   };

   toSignUp = () => {
      this.props.history.push("/signup");
   };

   // Facebook Login Section
   responseFacebook = (response) => {
      const data = {
         fid: response.id,
         name: response.name,
         email: response.email,
         userAvatar: response.picture.data.url,
      };
      this.props.onSignin(data, "facebook", this.props);
   };

   render() {
      // For Inputs
      const inputs = [];
      for (const key in this.state.signin_form) {
         inputs.push(
            <AuthInput
               key={key}
               label={key}
               config={this.state.signin_form[key].config}
               icon={this.state.signin_form[key].icon}
               value={this.state.signin_form[key].value}
               errMsg={this.state.signin_form[key].errMsg}
               valid={this.state.signin_form[key].isValid}
               touched={this.state.signin_form[key].touched}
               changed={this.inputChangeHandler}
            />
         );
      }

      // For Button
      const btn = (
         <AuthBtn
            btnname="SIGN IN"
            canClick={canClickBtn(this.state.signin_form)}
            clicked={this.submitHandler}
         />
      );

      // Go to Sign In page
      const swapAuth = (
         // SwapAuthBtn -> App.css
         <p className="text-base tracking-wide">
            New User?{" "}
            <span className="SwapAuthBtn" onClick={this.toSignUp}>
               Sign Up
            </span>
         </p>
      );

      // Facebook Login Btn
      const fbLogin = (
         <FacebookLogin
            appId="327829561590465"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={this.responseFacebook}
            cssClass="FB_Login_Btn"
         />
      );

      return (
         <div className="Signin flex">
            <div className="Signin_Left w-2/5 bg-gray-50 flex flex-col justify-center items-center">
               <h1 className="text-4xl my-1">Welcome back</h1>
               <p className="mb-2 text-base text-gray-500">Enjoy us</p>
               {inputs}
               {btn}
               {swapAuth}
               {fbLogin}
            </div>
            <div className="Signin_Right w-3/5 flex flex-col justify-center items-center">
               <p className="text-white font-bold text-center">
                  Connect with your <br />
                  loved ones
               </p>
               <div className="Signup_Bg mt-6">
                  <img src={signin_bg} alt="Sign Up Vector" />
               </div>
            </div>
         </div>
      );
   }
}

const dispatchToProps = (dispatch) => {
   return {
      onSignin: (data, type, props) => dispatch(onSignin(data, type, props)),
   };
};

export default connect(null, dispatchToProps)(SignIn);
