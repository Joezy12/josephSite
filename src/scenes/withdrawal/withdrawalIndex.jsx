import Header from "../../dashcomponent/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect, useRef} from "react";
import { auth, db } from "../../firebaseAuth";
import { doc, getDoc } from 'firebase/firestore';


function Withdrawal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [withState, setWithState] = useState("fee")

    const [userDetails, setUserDetails] = useState(null)
    
        const fetchUserData = async (e)=> {
            auth.onAuthStateChanged(async(user)=> {
                console.log(user);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    setUserDetails(docSnap.data())
                    console.log(docSnap.data())
                }
            })
        };
    
        useEffect(()=> {
            fetchUserData()
        }, [])
    

    let selectedWith;


    const inputStyle = {
        background: "rgba(0,0,0,1)",
        color: colors.greenAccent[100],
    }

    const boxStyle = {
        background: "transparent",
    }

    const [amount, setAmount] = useState(Number(0))

    const [calFee, setCalFee] = useState(0)

    function getAmount(event) {
        setAmount(event.target.value)
        setCalFee(Math.floor(amount * 0.2))
        console.log(amount)

    }

    const [fee, setFee] = useState(false)

    function changeFee() {
        if (amount < 1000) {
            toast.error("minimum withdrawal is 1k", { position: "top-center" })
        }else if(userDetails && amount > userDetails.accBalance){
           toast.error("insufficient Balance", {position: "top-center"})
        } else {
            setFee(!fee)
            setWithState("fee")
        }

    }

    async function noCard() {
        toast.error("payment option service unavailable, try another method", { position: "top-center" })
    }

    function numberWithComma(x){
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }



     const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB.');
        setImage(null);
        return;
      }
      setImage(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Only image files are allowed.');
      setImage(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };


    if (withState == "fee") {
        selectedWith = <div className="anime">
            <h1>withdraw</h1>
            <h2>${`${amount}`}</h2>
            <h1>withdrawal Fee</h1>
            <h3>&#8369; 5,000 (pesos)</h3>

            <div className="pay-btn">
                <button className="debit" onClick={noCard} >Pay with Debit card/Credit card</button>
                <button className="crypto" onClick={()=> setWithState("crypto")}>Pay with Transfer</button>
                {/* <button className="crypto" onClick={()=> setWithState("giftcard")}>Pay with gift card</button> */}
                <button className="can" onClick={changeFee}>Cancel</button>
            </div>
        </div>
    } else if (withState == "crypto") {
        selectedWith = <div className="pay-btn anime">
          <div className="bit-logo"></div>
            <h1 className="g-head">Transfer via GCASH </h1>

            <p className="g-p"> <span>Account Name</span>: Angelica Abejo</p>
            <p className="g-p"> <span>Account Number</span>: 09535815923</p>
            <p className="g-p"> <span>Amount</span>: &#8369; 10,000</p>
            <h5>Note: this account is generated only for this transaction and will be inactive after payment have been made</h5>
            <button className="crypto" onClick={()=> setWithState("confirm")}>I've made payment</button>
            <button className="debit" onClick={()=> setWithState("fee")} >Go back</button>
            <button className="can" onClick={changeFee}>Cancel</button>
             
        </div>
    }else if(withState == "confirm") {
        selectedWith = <div className="confirmer pay-btn">
           <div className="loading"><span class="loader"></span></div>
           <h1>Checking System</h1>
           <p>we have'nt received your payment yet, but will notify you as soon as we do, and proceed you to the next step.
            please be patient </p>
            <button className="debit" onClick={()=> setWithState("fee")} >Go back</button>
            <button className="crypto" onClick={changeFee}>Done</button>

        </div>
    } else if(withState == "giftcard") {
        selectedWith = <section className="pay-btn2">
             <div className="uploader-container">
      <h5 className="title">Upload an image of rear of gift card with revealed code</h5>

      <div
        className="drop-zone"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          hidden
        />
        <p>Click to upload or drag & drop</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {image && (
        <div className="preview-container">
          <img src={image} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
    <h4 className="or">OR</h4>
   
    <input type="text" placeholder="enter redemption code" className="redeem"/>
     <button className="crypto" onClick={()=> setWithState("confirm")}>Submit</button>
      <button className="debit" onClick={()=> setWithState("fee")} >Go back</button>
        </section>
    }

    return (
     <section>
        {userDetails ?    <div className="withdraw">


            {fee ? <div className="fee">
                <section>
                    <div className="my-circles">
                        <div>
                            <div className="circle one">1</div>
                            <p>Pay Fee</p>
                        </div>
                        <div>
                            <div className="circle">2</div>
                            <p>Select Account</p>
                        </div>
                        <div>
                            <div className="circle"><i className="bi-check"></i></div>
                            <p>Send Money</p>
                        </div>
                    </div>

                    <div className="send-box">
                        {/* <h1>withdraw</h1>
                        <h2>${`${amount}`}</h2>
                        <h1>withdrawal Fee</h1>
                        <h3>${`${calFee}`}</h3>

                        <div className="pay-btn">
                            <button className="debit" onClick={noCard} >Pay with Debit card/Credit card</button>
                            <button className="crypto">Pay with Crypto</button>
                             <button className="crypto">Pay with gift card</button>
                        <button className="can" onClick={changeFee}>Cancel</button>
                        </div> */}


                        {selectedWith}
                    </div>
                </section>
            </div> : ""}


            <Header title="Withdrawal" subtitle="" />
            <h1 className="b">Balance: ${`${numberWithComma(userDetails.accBalance)}`}.00</h1>
            <div className="withdraw-box">
                <div className="withdraw-form" style={boxStyle}>
                    <div className="enter-amount">
                        <h3>Enter amount </h3>
                        <input type="number" placeholder="$0" style={inputStyle} onChange={getAmount} />
                    </div>

                    <div className="enter-amount space">
                        <button className="with" onClick={changeFee}>Withdraw</button>
                    </div>
                    <div className="fee-write">
                        <p>Your location have been detected (philippine) and will be charged in pesos for withdraal fee</p>
                    </div>
                </div>
            </div>

        </div>: <div className="load"><span class="loader"></span></div>}
     </section>
    )
}

export default Withdrawal;
