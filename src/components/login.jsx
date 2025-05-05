

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInThunk } from "../redux/slices/logInThunk";
import './public.css'
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
        if (EID === 10000) {
            navigate(`Manage`)
        }
        if (EID !== -1 && EID !== 10000)
            navigate(`/listOrdersForEmployee`)//employee    
        if (CID === -1 && failed) {
            setNewcustomer(true)
            console.log(details);
            navigate(`/newcustomer`)
        }
    }, [failed, CID, EID])

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${process.env.PUBLIC_URL}/basisLabait.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
    };

    // סגנונות למיכל התוכן
    const contentWrapperStyle = {
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
    };

    // סגנונות לתוכן העיקרי
    const mainContentStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        padding: '25px',
        margin: '20px auto',
        maxWidth: '1200px',
        width: '90%'
    };

    const [scaleFactor, setScaleFactor] = useState(1.2); // ערך התחלתי - 1.2 מגדיל ב-20%
  
    // 👇 הגדר את baseSize כאן, לפני השימוש בו
    const baseSize = {
      fontSize: {
        small: `${14 * scaleFactor}px`,
        base: `${16 * scaleFactor}px`,
        large: `${18 * scaleFactor}px`,
        xl: `${20 * scaleFactor}px`,
        xxl: `${24 * scaleFactor}px`,
        heading: `${32 * scaleFactor}px`,
      },
      spacing: {
        xs: `${5 * scaleFactor}px`,
        sm: `${10 * scaleFactor}px`,
        md: `${15 * scaleFactor}px`,
        lg: `${20 * scaleFactor}px`,
        xl: `${30 * scaleFactor}px`,
      },
      borderRadius: `${6 * scaleFactor}px`,
      inputHeight: `${40 * scaleFactor}px`,
      buttonHeight: `${44 * scaleFactor}px`,
    };
    // 👇 עדכן את סגנון הכפתור כך
    const buttonStyle = {
        // גרדיאנט בגווני חום-אדום
        background: 'linear-gradient(135deg, #C4A484 0%, #B87333 50%, #A0522D 100%)',
        color: 'white',
        border: 'none',
        padding: `${baseSize.spacing.sm} ${baseSize.spacing.lg}`,
        borderRadius: baseSize.borderRadius,
        cursor: 'pointer',
        fontSize: baseSize.fontSize.base,
        fontWeight: '500',
        height: baseSize.buttonHeight,
        minWidth: `${100 * scaleFactor}px`,
       // צל עדין
        boxShadow: '0 4px 6px rgba(139, 69, 19, 0.2)',
        // מעבר חלק לאפקטים בעת hover
        transition: 'all 0.3s ease',
        // הוסף מעט ברק לכפתור
        position: 'relative',
        overflow: 'hidden',
        // טקסט חד יותר
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    };

    // 👇 הוסף סגנון למצב hover של הכפתור
    const handleButtonHover = (e) => {
        // גרדיאנט מעט יותר בהיר בעת hover
        e.target.style.background = 'linear-gradient(135deg, #9B5523 0%, #B53A3A 50%, #DD6C6C 100%)';
        e.target.style.boxShadow = '0 6px 12px rgba(139, 69, 19, 0.3)';
        // אפקט קל של הגדלה
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
    };

    // 👇 הוסף סגנון למצב יציאה מ-hover
    const handleButtonLeave = (e) => {
        e.target.style.background = 'linear-gradient(135deg, #8B4513 0%, #A52A2A 50%, #CD5C5C 100%)';
        e.target.style.boxShadow = '0 4px 6px rgba(139, 69, 19, 0.2)';
        e.target.style.transform = 'translateY(0) scale(1)';
    };

    // 👇 הוסף סגנון למצב לחיצה על הכפתור
    const handleButtonActive = (e) => {
        e.target.style.background = 'linear-gradient(135deg, #7B3503 0%, #951A1A 50%, #BD4C4C 100%)';
        e.target.style.boxShadow = '0 2px 4px rgba(139, 69, 19, 0.3)';
        e.target.style.transform = 'translateY(1px) scale(0.98)';
    };

    const formContainerStyle = {
        width: '100%',
        height: '40vh',
        maxWidth: '800px', // הגבל את הרוחב המקסימלי
        margin: '0 auto', // מרכוז אופקי
        padding: '20px',
        boxSizing: 'border-box'
    };

    const inputStyle = {
        width: '100%',
        height: '90px',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #e2e8f0', // צבע גבול בהיר יותר
        borderRadius: '6px',
        marginBottom: '15px',
        backgroundColor: '#faf8f5', // רקע בהיר מאוד
        color: '#2d3748',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        outline: 'none'
    };


    const handleFocus = (e) => {
        e.target.style.borderColor = '#4299e1'; // צבע גבול כחול בהיר בפוקוס
        e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.15)'; // הילה כחולה בהירה
        e.target.style.backgroundColor = '#ffffff'; // רקע לבן בפוקוס
    };


    const handleBlur = (e) => {
        e.target.style.borderColor = '#cbd5e0'; // חזרה לצבע גבול רגיל
        e.target.style.boxShadow = 'none'; // הסרת ההילה
        e.target.style.backgroundColor = '#f7fafc'; // חזרה לרקע רגיל
    };
    return (
        <div style={backgroundStyle}>
            <div style={contentWrapperStyle}>
                <div style={mainContentStyle}>
                    {!newcustomer && (
                        <div style={formContainerStyle} >
                            <input
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                // className="input-field"
                                type="text"
                                onChange={(e) => setDetails({ ...details, customername: e.target.value })}
                                placeholder="שם משתמש"
                            />
                            <input
                                style={inputStyle}
                                //    className="input-field"
                                type="password"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={(e) => setDetails({ ...details, password: +e.target.value })}//int המרה ל   +  
                                placeholder="סיסמה"
                            />
                            <button
                                style={buttonStyle}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                onMouseDown={handleButtonActive}
                                onMouseUp={handleButtonLeave}
                                // className="login-button"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onClick={() => {
                                    dispatch(editPassword(details.password));
                                    dispatch(editcustomername(details.customername));
                                    dispatch(logInThunk(details));
                                }}
                            >
                                התחבר
                            </button>
                        </div>
                    )}
                </div> </div></div>
    );
};


