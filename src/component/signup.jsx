import { useState } from "react";
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp(prop) {
    const navigate = useNavigate()

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const [signInfo, setSignInfo]  = useState({
    Fname: "",
    Lname: "",
    ssn: "",
    email: "",
    password: "",
    cPassword: "",
    })

    function gatherFunc(event){
      setSignInfo((prev)=> {
        return {
            ...prev,
            [event.target.name]: event.target.value,
        }
      })
     
    }

    function submitFunc(event){
        event.preventDefault();
       if(signInfo.Fname && signInfo.Lname && signInfo.email && signInfo.cPassword && signInfo.ssn && signInfo.password ){
        if(signInfo.password.length < 6) {
           setErrorMessage("password too short")
           setShowError(true)
            setTimeout(()=> {
          setShowError(false)
        }, 3000)
        }else {
            setSuccessMessage("successfully created account")
             localStorage.setItem('user', JSON.stringify(signInfo))
             setShowSuccess(true)
             setTimeout(()=> {
                navigate('../login')
             },3000)
        }
       }else {
        setShowError(true)
        setErrorMessage("provide complete information")
        setTimeout(()=> {
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
        <div className="sign-up">
             {prop.loadState ?  <div className="loader-box">
                <div className="loader"></div>
            </div>: ""}
            {prop.showErr ? <div className="error-box">
                 <p>{prop.errText}</p>
                </div>: ""}
            <form className="sign-box" onSubmit={submitFunc}>

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
                        <input type="text"  name="ssn" onChange={gatherFunc}/>
                    </div>

                    <div className="sign-input">
                        <p>Email Address</p>
                        <input type="text" name="email" onChange={gatherFunc} />
                    </div>

                    <div className="double-input">
                    <div className="sign-input">
                        <p>Password</p>
                        <input type="password" name="password" onChange={gatherFunc} />
                    </div>
                    <div className="sign-input">
                        <p>Confirm Password</p>
                        <input type="password" name="cPassword" onChange={gatherFunc} />
                    </div>
                </div>

                 <button className="sign-btn2 ran">SIGN UP</button> 

            </form>
        </div>
        </section>
    )
}

export default SignUp;