import Header from "../../dashcomponent/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

function Withdrawal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const inputStyle = {
        background: colors.primary[800],
        color: colors.greenAccent[100],
    }

    const boxStyle = {
        background: colors.primary[400],
    }
    return (
        <div className="withdraw">
            <Header title="Withdrawal" subtitle="" />
            <h1 className="b">Balance: $0.00</h1>
            <div className="withdraw-box">
                <div className="withdraw-form" style={boxStyle}>
                    <div className="enter-amount">
                        <h3>Enter amount you want to Withdraw</h3>
                        <input type="text" placeholder="$0" style={inputStyle}/>
                    </div>
                     <div className="enter-amount space">
                        <h3>Bank Name</h3>
                        <input type="text" placeholder="" style={inputStyle}/>
                    </div>
                     <div className="enter-amount space">
                        <h3>Account Number</h3>
                        <input type="number" placeholder="" style={inputStyle}/>
                    </div>
                    <div className="enter-amount space">
                        <h3>Account Name</h3>
                        <input type="text" placeholder="" style={inputStyle}/>
                    </div>
                    <div className="enter-amount space">
                        <h3>Routing Number</h3>
                        <input type="number" placeholder="" style={inputStyle}/>
                    </div>
                    <div className="enter-amount space">
                        <button className="with">Withdraw</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdrawal;