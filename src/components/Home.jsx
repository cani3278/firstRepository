import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Home.css';
import { useSelector } from 'react-redux';
export const Home = () => {
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();
const custDetails=useSelector(state=>state.user.userDetails);
  // אתחול ספריית האנימציות
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
    
    // כאן תוכל להוסיף את הלוגיקה לטעינת נתוני המשתמש, קטגוריות, מוצרים והזמנות אחרונות
    // לדוגמה:
    const fetchData = async () => {
      try {
        // בדיקה אם המשתמש מחובר
       // const user = useSelector(state=>state.user.custDetails);//localStorage.getItem('user');
        // if (!user) {
        //   navigate('/login');
        //   return;
        // }
        
        //setUserData(JSON.parse(user));
        
        // טעינת קטגוריות
        // const categoriesResponse = await fetch('/api/categories');
        // const categoriesData = await categoriesResponse.json();
        // setCategories(categoriesData);
        
        // לצורך הדוגמה, נשתמש בנתונים סטטיים
        setCategories([
          { id: 1, name: 'חומרי בניין', icon: 'building', count: 120 },
          { id: 2, name: 'כלי עבודה', icon: 'tools', count: 85 },
          { id: 3, name: 'אינסטלציה', icon: 'faucet', count: 64 },
          { id: 4, name: 'חשמל', icon: 'bolt', count: 92 }
        ]);
        
        setFeaturedProducts([
          { id: 101, name: 'מלט תמי 42.5', price: 29.90, image: '/cement.jpg' },
          { id: 102, name: 'פטיש 5 ק"ג', price: 149.90, image: '/hammer.jpg' },
          { id: 103, name: 'צינור PVC 110', price: 34.50, image: '/pipe.jpg' },
          { id: 104, name: 'כבל חשמל 3x2.5', price: 7.90, image: '/cable.jpg' }
        ]);
        
        setRecentOrders([
          { id: 1001, date: '15/04/2023', status: 'הושלמה', total: 1250.80 },
          { id: 1002, date: '02/05/2023', status: 'בהכנה', total: 876.40 }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <img src={`${process.env.PUBLIC_URL}/basisLabait.jpg`} alt="בסיס לבית" className="header-logo" />
            </div>
            <div className="header-actions">
              <div className="user-welcome">
                <span>שלום, {custDetails?.custName || 'אורח'}</span>
              </div>
              <div className="header-buttons">
                <Link to="/cart" className="btn-cart">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-count">0</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <i className="fas fa-sign-out-alt"></i> התנתק
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Welcome Banner */}
          <section className="welcome-banner" data-aos="fade-up">
            <div className="banner-content">
              <h1>ברוכים הבאים למערכת ההזמנות</h1>
              <p>כאן תוכלו להזמין מוצרים, לעקוב אחר הזמנות ולנהל את החשבון שלכם</p>
              <Link to="/newOrder" className="btn-primary">התחל בקנייה</Link>
            </div>
            <div className="banner-image">
              <img  src={`${process.env.PUBLIC_URL}/basisLabait.jpg`} alt="בסיס לבית" />
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories-section" data-aos="fade-up">
            <div className="section-header">
              <h2>קטגוריות מוצרים</h2>
              <Link to="/products" className="view-all">צפה בכל המוצרים</Link>
            </div>
            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.id} className="category-card" data-aos="zoom-in" data-aos-delay={category.id * 100}>
                  <div className="category-icon">
                    <i className={`fas fa-${category.icon}`}></i>
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.count} מוצרים</p>
                  <Link to={`/newOrder`} className="category-link">
                    צפה במוצרים <i className="fas fa-arrow-left"></i>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="featured-products" data-aos="fade-up">
            <div className="section-header">
              <h2>מוצרים מומלצים</h2>
              <Link to="/products/featured" className="view-all">צפה בכל המוצרים המומלצים</Link>
            </div>
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={product.id % 100 * 50}>
                  <div className="product-image">
                    <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p className="product-price">₪{product.price.toFixed(2)}</p>
                    <div className="product-actions">
                      <button className="btn-add-to-cart">
                        <i className="fas fa-cart-plus"></i> הוסף לסל
                      </button>
                      <Link to={`/products/${product.id}`} className="btn-view-product">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="recent-orders" data-aos="fade-up">
            <div className="section-header">
              <h2>הזמנות אחרונות</h2>
              <Link to="/orders" className="view-all">צפה בכל ההזמנות</Link>
            </div>
            {recentOrders.length > 0 ? (
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>מס' הזמנה</th>
                      <th>תאריך</th>
                      <th>סטטוס</th>
                      <th>סכום</th>
                      <th>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} data-aos="fade-right">
                        <td>#{order.id}</td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`status-badge ${order.status === 'הושלמה' ? 'completed' : 'pending'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>₪{order.total.toFixed(2)}</td>
                        <td>
                          <Link to={`/orders/${order.id}`} className="btn-view-order">
                            צפה בפרטים
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-orders-message">
                <p>אין הזמנות אחרונות להצגה</p>
                <Link to="/products" className="btn-primary">התחל בקנייה</Link>
              </div>
            )}
          </section>

          {/* Quick Links */}
          <section className="quick-links" data-aos="fade-up">
            <div className="quick-link-card" data-aos="zoom-in">
              <div className="quick-link-icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h3>הצעות מחיר</h3>
              <p>צפה בהצעות מחיר שהוכנו עבורך</p>
              <Link to="/quotes" className="quick-link-button">
                צפה בהצעות <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
            <div className="quick-link-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="quick-link-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>מעקב משלוחים</h3>
              <p>עקוב אחר סטטוס המשלוחים שלך</p>
              <Link to="/shipments" className="quick-link-button">
                עקוב אחר משלוחים <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
            <div className="quick-link-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="quick-link-icon">
                <i className="fas fa-user-cog"></i>
              </div>
              <h3>הגדרות חשבון</h3>
              <p>עדכן את פרטי החשבון שלך</p>
              <Link to="/account" className="quick-link-button">
                עדכן פרטים <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
            <div className="quick-link-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="quick-link-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>תמיכה</h3>
              <p>צור קשר עם נציג שירות לקוחות</p>
              <Link to="/support" className="quick-link-button">
                צור קשר <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="#5d4037" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={`${process.env.PUBLIC_URL}/basisLabait.jpg`} alt="בסיס לבית" />
            </div>
            <div className="footer-info">
              <p>© 2023 כל הזכויות שמורות לחברת בסיס לבית בע"מ</p>
              <p>רחוב הבונים 15, אזור התעשייה, חולון | טלפון: 03-1234567</p>
            </div>
            <div className="footer-links">
              <Link to="/terms">תנאי שימוש</Link>
              <span className="separator">|</span>
              <Link to="/privacy">מדיניות פרטיות</Link>
              <span className="separator">|</span>
              <Link to="/contact">צור קשר</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};




