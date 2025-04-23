

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInThunk } from "../redux/slices/logInThunk";
import './login.css'
import { editPassword, editUsername } from "../redux/slices/userSlice";
export const Login = () => {
    const navigate = useNavigate();
    const CID = useSelector(state => state.user.CID);
    const EID = useSelector(state => state.user.EID);
    const failed = useSelector(state => state.user.failed);
    const dispatch = useDispatch();
    const [details, setDetails] = useState({ username: "", password: "" });
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        if (CID !== -1)
            navigate(`Home`)
        if (EID===10000) {
            navigate(`Manage`)
        }
        if (EID !== -1&&EID !== 10000)
            navigate(`service`)//employee    
        if (CID === -1 && failed) {
            setNewUser(true)
            console.log(details);
            navigate(`/newUser`)
        }
    }, [failed, CID,EID])


    return (
        <div className="login-container">
            {!newUser && (
                <>
                    <input
                        className="input-field"
                        type="text"
                        onChange={(e) => setDetails({ ...details, username: e.target.value })}
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
                            dispatch(editUsername(details.username));
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


