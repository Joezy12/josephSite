import Header from "../../dashcomponent/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect} from "react";
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
        }

    }

    async function noCard() {
        toast.error("payment option service unavailable, try another method", { position: "top-center" })
    }


    if (withState == "fee") {
        selectedWith = <div className="anime">
            <h1>withdraw</h1>
            <h2>${`${amount}`}</h2>
            <h1>withdrawal Fee</h1>
            <h3>${`${calFee}`}</h3>

            <div className="pay-btn">
                <button className="debit" onClick={noCard} >Pay with Debit card/Credit card</button>
                <button className="crypto" onClick={()=> setWithState("crypto")}>Pay with Crypto</button>
                <button className="crypto">Pay with gift card</button>
                <button className="can" onClick={changeFee}>Cancel</button>
            </div>
        </div>
    } else if (withState == "crypto") {
        selectedWith = <div className="pay-btn anime">
            <h1>Bitcoin wallet address: </h1>
            <p> {userDetails ? userDetails.cryptoAddress : ""} </p>
            <h5>Note: this addresses are generated only for this transaction and will be inactive after payment have been made</h5>
            <button className="crypto" >I've made payment</button>
            <button className="debit" onClick={()=> setWithState("fee")} >Go back</button>
            <button className="can" onClick={changeFee}>Cancel</button>
             
        </div>
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
            <h1 className="b">Balance: ${`${userDetails.accBalance}`}.00</h1>
            <div className="withdraw-box">
                <div className="withdraw-form" style={boxStyle}>
                    <div className="enter-amount">
                        <h3>Enter amount </h3>
                        <input type="number" placeholder="$0" style={inputStyle} onChange={getAmount} />
                    </div>

                    <div className="enter-amount space">
                        <button className="with" onClick={changeFee}>Withdraw</button>
                    </div>
                </div>
            </div>

        </div>: <div className="load"><span class="loader"></span></div>}
     </section>
    )
}

export default Withdrawal;