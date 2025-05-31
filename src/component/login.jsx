import { useState } from "react";
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";
import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseAuth";
import { toast } from "react-toastify";


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

    }

    const [showLoad, setShowLoad] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    function showP() {
        setShowPassword((prev) => {
            return !prev;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoad(true)
        try {
            await signInWithEmailAndPassword(auth, logInfo.email, logInfo.password)
            toast.success("user logged in successfully", { position: "top-center" })
            navigate("../dash")
        } catch (error) {
            setShowLoad(false)
            toast.error(error.message, { position: "top-center" })
        }
    }



    return (

        <section>

            <Navbar />
           {showLoad ?  <div className="login-loader">
                <span className="loader"></span>
            </div>: ""}

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

                    <h1>Sign in</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
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