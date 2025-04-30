

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInThunk } from "../redux/slices/logInThunk";
import './login.css'
import { editPassword, editcustomername } from "../redux/slices/userSlice";
export const Login = () => {
    const navigate = useNavigate();
    const CID = useSelector(state => state.user.CID);
    const EID = useSelector(state => state.user.EID);
    const failed = useSelector(state => state.user.failed);
    const dispatch = useDispatch();
    const [details, setDetails] = useState({ customername: "", password: "" });
    const [newcustomer, setNewcustomer] = useState(false)

    useEffect(() => {
        if (CID !== -1)
            navigate(`Home`)
        if (EID===10000) {
            navigate(`Manage`)
        }
        if (EID !== -1&&EID !== 10000)
            navigate(`/listOrdersForEmployee`)//employee    
        if (CID === -1 && failed) {
            setNewcustomer(true)
            console.log(details);
            navigate(`/newcustomer`)
        }
    }, [failed, CID,EID])


    return (
        <div className="login-container">
            {!newcustomer && (
                <>
                    <input
                        className="input-field"
                        type="text"
                        onChange={(e) => setDetails({ ...details, customername: e.target.value })}
                        placeholder="שם משתמש"
                    />
                    <input
                        className="input-field"
                        type="password"
                        onChange={(e) => setDetails({ ...details, password: +e.target.value })}//int המרה ל   +  
                        placeholder="סיסמה"
                    />
                    <button
                        className="login-button"
                        onClick={() => {
                            dispatch(editPassword(details.password));
                            dispatch(editcustomername(details.customername));
                            dispatch(logInThunk(details));
                        }}
                    >
                        התחבר
                    </button>
                </>
            )}
        </div>
    );
};


