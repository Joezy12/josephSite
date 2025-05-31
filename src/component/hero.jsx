
import girl from '../../public/manhand.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Hero() {
    const styler = {
        background: `linear-gradient(transparent, #0C0E13),url(${girl})`,
        backgroundSize: `700px`,
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,

    }

    const navigate = useNavigate();

    

    return (
        <div className="hero-section">
            <div className="hero-left">
              <h1>FCFG - Banking Made Simple, Secure, and Seamless</h1>
              <p>Welcome to FCFG — where your financial goals meet innovative solutions. From everyday banking to long-term investments, we’re here to help you grow, protect, and manage your money with confidence. </p>
              <p className="bright-p">Invest and earn <br /> with <span>Up to 2.5% - 5.0% daily </span>profit</p>
              <div className='hero-sign'>
                  <input type="email" placeholder='your@gmail.com' />
               <Link to="signup"> <button>Get Started</button></Link>  

              </div>
            </div>
            <div className="hero-right" style={styler}></div>
        </div>
    )
}

export default Hero;