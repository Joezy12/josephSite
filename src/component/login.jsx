import { useState } from "react";
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";
import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


function Login(prop) {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const [logInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    function gatherLogFunc(event) {
        setLoginInfo((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
        console.log(logInfo)
    }

    const [showPassword, setShowPassword] = useState(false);

    function showP() {
        setShowPassword((prev) => {
            return !prev;
        })
    }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    console.log(user)

    function submitLog(event) {
        event.preventDefault();
        if (user.email == logInfo.email && user.password == logInfo.password) {
           setSuccessMessage("welcome back")
           setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                navigate("../dash")
            }, 3000)
        } else {
            setErrorMessage("incorrect login details")
            setShowError(true)
            setTimeout(() => {
               setShowError(false)
            }, 3000)
        }
    }

    const successStyle = {
        position: "fixed",
        marginTop: showSuccess ? "0px" : "-200px",
        width: "100%",
    }
      const errorStyle = {
        position: "fixed",
        marginTop: showError ? "0px" : "-200px",
        width: "100%",
    }
    return (

        <section>
              <div className="error-box" style={errorStyle}>{errorMessage}</div>
             <div className="success-box" style={successStyle}>{successMessage}</div>
            <Navbar />
            {prop.loadState ? <div className="loader-box">
                <div className="loader"></div>
            </div> : ""}
            <div className="login">
                <div className="login-left">
                    <h1>Welcome <br /> Back</h1>
                    <p>it is a long established fact that a reader will be distracted by the readable  content of a page when looking at it's layout. The point of using</p>
                    <div className="icons">
                        <i className="bi-facebook"></i>
                        <i className="bi-twitter"></i>
                        <i className="bi-instagram"></i>
                        <i className="bi-youtube"></i>
                    </div>
                </div>
                <div className="login-right">
                    {prop.showErr ? <div className="error-box">
                        <p>{prop.errText}</p>
                    </div> : ""}
                    <h1>Sign in</h1>
                    <form className="login-form" onSubmit={submitLog}>
                        <div className="fields">
                            <p>Email Address </p>
                            <input type="email" name="email" onChange={gatherLogFunc} />
                        </div>

                        <div className="fields">
                            <p>Password</p>
                            <div className="pass">
                                <input type={showPassword ? "text" : "password"} name="password" onChange={gatherLogFunc} className="eye-input" /><div className="eye" onClick={showP}>{showPassword ? <i className="bi-eye"></i> : <i className="bi-eye-slash"></i>}</div>
                            </div>
                        </div>

                        <div className="remember-check">
                            <input type="checkbox" />
                            <p>Remember me</p>
                        </div>

                        <button>Sign in now</button>

                        <h2>Lost your password?</h2>

                        <h3>By clicking on "Sign in now" you agree to <u>Terms of service</u> | <u>Privacy Policy</u></h3>


                    </form>

                </div>
            </div>
        </section>
    )
}

export default Login;