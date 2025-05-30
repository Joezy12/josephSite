import redBull from '../../public/redbull.png'
import logo1 from '../../public/logo1.jpeg'


function PhoneTop(prop) {

    return (
        <div className="phone-top">
            <div className="phone-logo">
            <img src={logo1} alt="" />
            <h1>FCFG</h1>
            </div>
            <div className="phoner">
                <div className="phone-pic"></div>
            
            </div>
        </div>
    )
}

export default PhoneTop;