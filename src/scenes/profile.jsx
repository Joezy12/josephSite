import { useEffect, useState } from "react";
import { auth, db } from "../firebaseAuth";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";

function Profile() {
  
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

    return (
        <section className="profile">
       {userDetails ? <div>
             <div className="profile-top">
                <div className="pp"></div>
                <div>
                    <h1>{userDetails.Fname.toUpperCase()} {userDetails.Lname.toUpperCase()}</h1>
                    <p>Silver plan</p>
                </div>
            </div>
            <div className="main-profile">
                <div>
                    <h1>Name </h1>
                    <h1>Social Security</h1>
                    <h1>Account Number</h1>
                    <h1>Routing Number</h1>
                    <h1>Date of Birth</h1>
                    <h1>Phone no.</h1>
                </div>
                <div>
                 <p>{userDetails.Fname} {userDetails.Lname}</p>
                 <p>{userDetails.ssn.slice(0,4)}XXXXXXX</p>
                 <p>{userDetails.accountNumber}</p>
                 <p>{userDetails.routingNumber}</p>
                 <p>{userDetails.dateOfBirth}</p>
                 <p>{userDetails.phone}</p>
                </div>
            </div>
            <div className="profile-bottom">
             <p>My Total Assets</p>
             <h1>${userDetails.accBalance}.00</h1>
            </div>
       </div> : <div className="load"><span class="loader"></span></div>}
        </section>
    )
}

export default Profile;