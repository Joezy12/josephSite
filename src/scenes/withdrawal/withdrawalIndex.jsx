import Header from "../../dashcomponent/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { toast } from "react-toastify";

function Withdrawal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const inputStyle = {
        background: "rgba(0,0,0,1)",
        color: colors.greenAccent[100],
    }

    const boxStyle = {
        background: "transparent",
    }

    const [amount, setAmount] = useState(0)

    function getAmount(event) {
         setAmount(event.target.value)
         console.log(amount)
    } 

    const [fee, setFee] = useState(false)

    function changeFee() {
        if(amount < 1000) {
            toast.error("minimum withdrawal is 1k", {position: "top-center"})
        }else {
          setFee(!fee)
        }
       
    }
    return (
        <div className="withdraw">


        {fee ?     <div className="fee">
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
                        <h1>withdraw</h1>
                        <h2>${`${amount}`}</h2>
                        <h1>withdrawal Fee</h1>
                        <h3>$300</h3>

                        <div className="pay-btn">
                            <button className="crypto">Pay with Crypto</button>
                             <button className="crypto">Pay with gift card</button>
                        <button className="can" onClick={changeFee}>Cancel</button>
                        </div>
                    </div>
                </section>
            </div>: ""}


            <Header title="Withdrawal" subtitle="" />
            <h1 className="b">Balance: $20,000.00</h1>
            <div className="withdraw-box">
                <div className="withdraw-form" style={boxStyle}>
                    <div className="enter-amount">
                        <h3>Enter amount </h3>
                        <input type="number"  placeholder="$0" style={inputStyle} onChange={getAmount}/>
                    </div>

                    <div className="enter-amount space">
                        <button className="with" onClick={changeFee}>Withdraw</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Withdrawal;