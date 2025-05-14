import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { editPassword, editcustomername } from "../redux/slices/userSlice";
import { logInThunk } from "../redux/slices/logInThunk";
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
    console.log('Login component rendered');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({ customername: "", password: "" });
    const CID = useSelector(state => state.user.CID);
    const EID = useSelector(state => state.user.EID);
    const failed = useSelector(state => state.user.failed);
    const [newcustomer, setNewcustomer] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // אתחול ספריית האנימציות
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true
        });
    }, []);

    // טיפול בניווט בהתאם למצב המשתמש
    useEffect(() => {
        // מונע ניווט בטעינה הראשונית אם אין צורך
        if (CID === undefined || EID === undefined || failed === undefined) {
            return;
        }

        if (CID !== -1) {
            navigate(`/Home`);
            return; // חשוב להוסיף return כדי למנוע בדיקות נוספות
        }
        
        if (EID === 10000) {
            navigate(`/Manage`);
            return;
        }
        
        if (EID !== -1 && EID !== 10000) {
            navigate(`/listOrdersForEmployee`);
            return;
        }
        
        if (CID === -1 && failed) {
            setNewcustomer(true);
            navigate(`/newcustomer`);
            return;
        }
       
    }, [failed, CID, EID, navigate]); // הוספנו navigate למערך התלויות

    const handleSubmit = (e) => {
        if (isButtonDisabled) {
            e.preventDefault();
            return;
          }
          
          setIsButtonDisabled(true);
          
          // אפשר לחיצה מחדש אחרי 2 שניות
          setTimeout(() => {
            setIsButtonDisabled(false);
          }, 2000);
        e.preventDefault();
        setError('');
        dispatch(logInThunk(details));
     
    };

    return (
        <div className="login-page">
            {/* Hero Section */}
            <div className="login-hero-section">
                <div className="container">
                    <div className="login-content" data-aos="fade-up">
                        <div className="login-logo-container">
                            <img src={`${process.env.PUBLIC_URL}/basisLabait.jpg`} alt="בסיס לבית" className="login-logo" />
                        </div>
                        <div className="login-form-container" data-aos="fade-up" data-aos-delay="200">
                            <h2>התחברות למערכת</h2>
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label>דואר אלקטרוני או שם פרטי</label>
                                    <input
                                        type="text"
                                        value={details.customername}
                                        onChange={(e) => setDetails({ ...details, customername: e.target.value })}
                                        required
                                        placeholder="הזן את כתובת האימייל שלך"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">סיסמה</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={details.password}
                                        onChange={(e) => setDetails({ ...details, password: +e.target.value })}
                                        required
                                        placeholder="הזן את הסיסמה שלך"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn-login pulse-animation">התחבר</button>
                                    <div className="forgot-password">
                                        <Link to="/forgot-password">שכחת סיסמה?</Link>
                                    </div>
                                </div>
                            </form>
                            <div className="register-link" data-aos="fade-up" data-aos-delay="300">
                                <p>עדיין אין לך חשבון?</p>
                                <Link to="/newcustomer" className="btn-register">הרשמה כלקוח חדש</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="login-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-info">
                            <p>© 2023 כל הזכויות שמורות לחברת בסיס לבית בע"מ</p>
                        </div>
                        <div className="footer-links">
                            <Link to="/">חזרה לדף הבית</Link>
                            <span className="separator">|</span>
                            <Link to="/contact">צור קשר</Link>
                            <span className="separator">|</span>
                            <Link to="/terms">תנאי שימוש</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

