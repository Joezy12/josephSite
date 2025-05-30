
function Review() {

    const reviewPic = [
        {
            text: "I love how simple it is to manage my finances from anywhere. Transferring funds, paying bills, and checking my balance takes seconds. Highly recommend!",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            name: " Elena J"
        },
         {
            text: "I’ve been banking with FCFG for over 10 years, and their service just keeps getting better. Whether it’s in-branch or online, I always feel valued and supported",
            img: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg",
             name: " Marcus A."
        },
         {
            text: "From our first home loan to setting up savings accounts for our kids, [Bank Name] has been with us every step of the way. They genuinely care",
            img: "https://img.freepik.com/free-photo/close-up-upset-american-black-person_23-2148749582.jpg",
             name: "Aisha K."
        },
        
        
    ];

    

    const showReview = reviewPic.map((eachReview) => {

        const stylers = {
            background: `url(${eachReview.img})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
        }
        return <div className="user-review">
                    <div className="user-review-pic" style={stylers}>
                    </div>
                    <div className="review-star">
                        <i className="bi-star-fill"></i>
                        <i className="bi-star-fill"></i>
                        <i className="bi-star-fill"></i>
                        <i className="bi-star-fill"></i>
                        <i className="bi-star-fill"></i>
                    </div>
                    <div className="user-review-text">
                        {eachReview.text}
                    </div>
                    <div className="user-review-name">{eachReview.name}</div>
                </div>
    })

   

    return (
        <div className="review">
            <div className="review-head">
                <h1>What People Say About <br /> <span>"FCFG"</span> </h1>
                <p>People are very positive about our services, here is <br />
                    is what people are saying about us</p>
            </div>

            <div className="review-body">
               {showReview}
            </div>
        </div>
    )
}

export default Review;