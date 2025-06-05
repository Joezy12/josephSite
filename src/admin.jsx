import { db } from "./firebaseAuth";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import app from "./firebaseAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function Admin() {

    const [showLoad, setShowLoad] = useState(false)

    const [amount, setAmount] = useState(0)
    const [btcAddress, setBtcAddress] = useState("")

    const collectionRef = collection(db, "users")

    const [clientId, setClientId] = useState("")

    const [client, setClient] = useState(null)

    useEffect(() => {
        if (client) {
            toast.success("found client", { position: "top-center" })
        }
    }, [client])

    async function getData(event) {
        setShowLoad(true)
        getDocs(collectionRef)
            .then((response) => {
                let users = response.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })
                console.log(users)
                let mainUser = users.filter((user) => {
                    return user.id == clientId
                })
                setClient(mainUser[0])
                console.log(mainUser)
                setShowLoad(false)

            })
            .catch((error) => {
                console.log(error.message)
                setShowLoad(false)
            })
    }

    async function sendMoney(event) {
       event.preventDefault();
        if (client) {
           if(amount && btcAddress) {
             const docToUpdate = doc(db, "users", client.id);
            updateDoc(docToUpdate, {
                accBalance: Number(client.accBalance) + Number(amount),
                cryptoAddress: btcAddress,
            })
                .then(() => {
                    toast.success("sent Successfully", { position: "top-center" })
                })
                .catch((error) => {
                    toast.error(error.message, { position: "top-center" })
                })
           }else {
            toast.error("please fill in complete details", {position: "top-center"})
           }
        }else {
            toast.error("no client found", {position: "top-center"})
        }
    }

    return (
        <section className="admin">
            {showLoad ? <div className="login-loader">
                <span className="loader"></span>
            </div> : ""}

            <h1 className="admin-head">FCFG Client Admin</h1>

            {client ? <div><h4 className="client-founder">{client.Fname}  {client.Lname}</h4><p className="my-acc">Account Balance : {client.accBalance}</p></div> : <h4 className="client-found">NO CLIENT</h4>}

            <div className="client">
                <h2>Enter Client ID</h2>
                <input type="text" onChange={(e) => setClientId(e.target.value)} />
                <button onClick={getData}>check client</button>
            </div>

            <form onSubmit={sendMoney}>
                <div className="my-cl">
                    <h2>Add to client balance</h2>
                    <input type="number" onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="client">
                    <h2>Your Username for alert</h2>
                    <input type="text" />
                </div>
                <div className="client">
                    <h2>Crypo bitcoin address</h2>
                    <input type="text" onChange={(e) => setBtcAddress(e.target.value)} />
                </div>

                <button className="sub-btn">Send</button>

            </form>

        </section>
    )
}

export default Admin;