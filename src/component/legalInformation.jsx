import Navbar from "./navbar";
import Footer from "./footer";

function LegalInformation() {
    
    return (
        <section>
            <Navbar />
        <div className="legal-information">
            <h1>Legal Information</h1>
            <h3>Information</h3>

            <p>
           FCFG is a licensed financial institution regulated by smartfinancefx, operating in accordance with applicable banking and financial services laws in [Country/Region]. We adhere to all relevant laws, regulations, and industry standards to ensure the highest level of transparency, security, and integrity in our services.
            </p>


            <p>
            Please note that the only source of legitimate and up-to-date incorporation information about SmartfinanceFX LTD can be found on our website . This applies to registration number , legal information contained on the UK Registrar's website in relation to SmartfinanceFX LTD, as well as any additional information and any related data.
            </p>

            <p>
            SmartfinanceFX is one of the most reliable diversified financial investment service provider in the world. Our fundamental mission is to help customers and clients achieve their financial objectives. With offices location in the United States, Australia,Canada and headquartered in Uk, SmartfinanceFX have staffs with over 30 years of experience in combining financial development and trades. We are committed to pushing the boundaries of what constitutes the highest standards in trades and asset management.
            </p>

            <ul>
                <li><span>Registration Number:</span> 2335663</li>
                <li><span>Renewed on:</span> 22nd July 2019</li>
                <li>We have a reliable financial department that handles issues of payout and initial investment and other monetary transactions.</li>
                <li>We are known for making withdrawals stress-free and easy for our clients.</li>
                <li>We have a variety of trading platforms to meet every income level.</li>

                <li><img src="https://smartfinancefx.com/img/cert.jpg" alt="" width="100%" /></li>
            </ul>
        </div>
        <Footer />
        </section>
    )
}

export default LegalInformation;