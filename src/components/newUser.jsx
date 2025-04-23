import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserThunk } from "../redux/slices/addUserThunk";
import "./login.css"
export const NewUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const CID = useSelector(state => state.user.CID);
    const EID = useSelector(state => state.user.EID);
    useEffect(() => {
        console.log(username+"username");
    }, [])

    // useEffect(() => {
    //     if (CID !== -1) {
    //         navigate(`/Home`)
    //     }
    // }, [CID])
    useEffect(() => {
        if (CID !== -1)
            navigate(`Home`)
        if (EID===10000) {
            navigate(`Manager`)
        }
        if (EID !== -1&&EID !== 10000)
            navigate(`service`)//employee    
           }, [ CID,EID])
    return <div className="newUser-container"> 
        <input className="newUserInput" type="text" value={username}  />
        <input className="newUserInput" type="text" value={password}  />
        <input className="newUserInput" type="text" onChange={(e) => setPhone(e.target.value)} placeholder="your phone number" />
        <input className="newUserInput" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="your Email" />
        <input className="newUserInput" type="text" onChange={(e) => setAddress(e.target.value)} placeholder="your address" />
        <button className="newUserButton" onClick={async () => {
             dispatch(addUserThunk({
                custId: password,
                custName: username,
                custAddress: address,
                custEmail: email,
                custPhone: phone
            }))
        }}
        >logOn</button>
    </div>
}

