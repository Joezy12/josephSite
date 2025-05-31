import { useState } from "react";
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseAuth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp(prop) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
     const [showLoad, setShowLoad] = useState(false)


    function showP() {
        setShowPassword((prev) => {
            return !prev;
        })
    }


    const [signInfo, setSignInfo] = useState({
        Fname: "",
        Lname: "",
        ssn: "",
        email: "",
        password: "",
        cPassword: "",
    })

    function gatherFunc(event) {
        setSignInfo((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })

    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setShowLoad(true)
        if (signInfo.Fname && signInfo.Lname && signInfo.cPassword && signInfo.email && signInfo.password && signInfo.ssn) {
            if (signInfo.password == signInfo.cPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, signInfo.email, signInfo.password);
                    const user = auth.currentUser;
                    console.log(user)
                    if (user) {
                        await setDoc(doc(db, "users", user.uid), {
                            Fname: signInfo.Fname,
                            Lname: signInfo.Lname,
                            ssn: signInfo.ssn,
                            email: signInfo.email,
                            password: signInfo.cPassword,
                            cPassword: signInfo.cPassword,
                        })
                    }
                    toast.success("registered successfully", { position: 'top-center' })
                    setTimeout(()=> {
                        navigate('../login')
                    },3000)
                } catch (error) {
                    toast.error(error.message.slice(9), { position: 'top-center' })
                    setShowLoad(false)
                }
            } else {
                setShowLoad(false)
                toast.error("passwords do not match", { position: 'top-center' })

            }
        } else {
            setShowLoad(false)
            toast.error("fill in the scomplete details", { position: 'top-center' })
           
        }
    }



    return (
        <section>

            <Navbar />
             {showLoad ?  <div className="login-loader">
                <span className="loader"></span>
            </div>: ""}
            <div className="sign-up">

                <form className="sign-box" onSubmit={handleRegister} >

                    <h1>Sign Up</h1>

                    <div className="double-input">
                        <div className="sign-input">
                            <p>First Name</p>
                            <input type="text" name="Fname" onChange={gatherFunc} />
                        </div>
                        <div className="sign-input">
                            <p>Last Name</p>
                            <input type="text" name="Lname" onChange={gatherFunc} />
                        </div>
                    </div>

                    <div className="sign-input">
                        <p>Social security Number (SSN)</p>
                        <input type="number" name="ssn" onChange={gatherFunc} />
                    </div>

                    <div className="sign-input">
                        <p>Email Address</p>
                        <input type="text" name="email" onChange={gatherFunc} />
                    </div>

                    <div className="double">
                        <div className="sign-input">
                        <p>Password</p>
                        <input type={showPassword ? "text" : "password"} name="password" onChange={gatherFunc} />
                    </div>
                     <div onClick={showP}>
                        {showPassword ? <i className="bi-eye"></i>: <i className="bi-eye-slash"></i>}
                    </div>
                    </div>

                     <div className="double">
                        <div className="sign-input">
                        <p>Confirm password</p>
                        <input type={showPassword ? "text" : "password"} name="cPassword" onChange={gatherFunc} />
                    </div>
                    <div onClick={showP}>
                        {showPassword ? <i className="bi-eye"></i>: <i className="bi-eye-slash"></i>}
                    </div>
                    </div>

                    <button className="sign-btn2 ran">SIGN UP</button>

                </form>
            </div>
        </section>
    )
}

export default SignUp;