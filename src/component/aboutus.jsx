import Navbar from "./navbar";
import Footer from "./footer";

function AboutUs() {

    return (
        <section>
            <Navbar />
        <div className="about">
            <h1>About US</h1>
            <h2>Introduction</h2>
            <h2>At FCFG, we believe banking should be built on trust, integrity, and a genuine commitment to your financial well-being. Since our founding in 2003, we have served individuals, families, and businesses with personalized financial solutions and a strong focus on long-term relationships.</h2>

            <p>With a full range of services—from everyday banking and personal loans to business accounts and investment support—we combine modern technology with the personal touch of experienced professionals. Whether you're opening your first savings account, growing your business, or planning for retirement, our team is here to guide you every step of the way.</p>

            <img src="https://smartfinancefx.com/images/about1.jpg" alt="" />

            <p>As an International bank, we take pride in contributing to the communities we serve through responsible banking practices, community involvement, and a customer-first approach.

At FCFG, you're not just another account. You're part of our story.

</p>

            <img src="https://smartfinancefx.com/images/about.jpg" alt="" />

            <p>At FCFG, you're not just another account. You're part of our story.</p>
        </div>
        <Footer />
        </section>
    )
}

export default AboutUs;