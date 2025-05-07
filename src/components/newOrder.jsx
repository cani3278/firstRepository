// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getProductsThunk } from "../redux/slices/getProductsThunk";
// import { addOrderThunk } from "../redux/slices/addOrderThunk";
// import './newOrder.css';

// // Material UI imports
// import {
//   ThemeProvider, createTheme, Box, Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions, FormControl, InputLabel, Select, MenuItem, Paper, Container, Divider, Chip
// } from "@mui/material";
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import InfoIcon from '@mui/icons-material/Info';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import '@fontsource/roboto';
// import { getEmployeesThunk } from "../redux/slices/getEmployeesThunk";

// export const NewOrder = () => {
//   const products = useSelector(state => state.Products.productsList);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const CID = useSelector(state => state.user.CID);
//   const employees = useSelector(state => state.Employees.employees);

//   const [myOrders, setMyOrders] = useState([]);
//   const [employee, setEmployee] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [listEmps, setListEmps] = useState(false);

// //use effect
//   useEffect(() => {
//     dispatch(getProductsThunk());
//   }, [dispatch]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const initialOrders = products.map(p => ({
//         prodId: p.prodId,
//         prodName: p.pname,
//         prodPic: p.ppicture,
//         orderId: 0,
//         count: 0,
//         cost: 0
//       }));
//       setMyOrders(initialOrders);
//     }
//     console.log(products);
//   }, [products]);

//   // useEffect(() => {
//   //   // Calculate order total whenever orders change
//   //   const total = myOrders.reduce((sum, item) => {
//   //     const product = products.find(p => p.prodId === item.prodId);
//   //     return sum + (item.count * (product?.pprice || 0));
//   //   }, 0);
//   //   setOrderTotal(total);
//   // }, [myOrders, products]);

//   const getEmps = () => {
//     dispatch(getEmployeesThunk());
//     console.log(employees);
//     setListEmps(true);
//   }
// useEffect(()=>{

// },[listEmps])

//   const handleQuantityChange = (prodId, change) => {
//     setListEmps(true);
//     getEmps();
//     console.log("handleQuantityChange");
//     setMyOrders(prevOrders =>
//       prevOrders.map(order => {
//         if (order.prodId === prodId) {
//           const newCount = Math.max(0, order.count + change);
//           return { ...order, count: newCount };
//         }
//         return order;
//       })
//     );
//   };

//   const handleOpenDetails = (product) => {
//     setSelectedProduct(product);
//     setOpenDialog(true);
//   };

//   const handleCloseDetails = () => {
//     setOpenDialog(false);
//   };

//   const handleEmployeeChange = (event) => {
//     setListEmps(true);
//     setEmployee(event.target.value);
//   };

//   const handleFinishOrder = () => {
//     const orderItems = myOrders.filter(item => item.count > 0);
// console.log("handleFinishOrder");
//     if (orderItems.length > 0) {
//       dispatch(addOrderThunk({
//         details: orderItems,
//         id: CID,
//         employeeId: employee
//       }));
//       navigate("/Home");
//     } else {
//       alert("לא נקלטה הזמנה");
//     }
//   };
  
//   const handleImageError = (event) => {
//     event.target.src = 'https://placehold.co/300x180/cccccc/333333?text=No+Image';
//   };

//  //רכיבי עיצוב
//   // Custom theme with RTL support
//   const theme = createTheme({
//     direction: 'rtl',
//     typography: {
//       fontFamily: [
//         'Roboto',
//         '"Segoe UI Symbol"',
//       ].join(','),
//     },
//     palette: {
//       primary: {
//         main: '#1976d2',
//       },
//       secondary: {
//         main: '#f50057',
//       },
//       background: {
//         default: '#f5f5f5',
//       },
//     },
//   });


//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
//         <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//             הזמנה חדשה
//           </Typography>
//           <Divider sx={{ mb: 4 }}>
//             <Chip label="בחר מוצרים" color="primary" />
//           </Divider>

//           <Grid container spacing={3}>
//             {products.map((product) => {
//               const orderItem = myOrders.find(item => item.prodId === product.prodId) || { count: 0 };

//               return (
               
//                 <Grid item xs={12} sm={6} md={3} key={product.prodId}> 
//                   <Card
//                     elevation={4}
//                     sx={{
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       transition: 'transform 0.2s',
//                       '&:hover': {
//                         transform: 'scale(1.02)',
//                       },
//                       borderRadius: 2,
//                       overflow: 'hidden'
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       height={180}
//                       image={product.ppicture}
//                       alt={product.pname}
//                       onError={handleImageError}
//                       sx={{
//                         objectFit: 'cover',
//                         objectPosition: 'center',
//                       }}
//                     />
//                     {/* <Box 
//                         sx={{ 
//                           position: 'absolute', 
//                           bottom: 0, 
//                           width: '100%', 
//                           background: 'rgba(0,0,0,0.6)',
//                           p: 1
//                         }}
//                       >
//                         <Typography variant="h6" component="div" sx={{ color: 'teal', fontWeight: 'bold' }}>
//                           {product.pname}
//                         </Typography>
//                       </Box> */}


//                     <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 
//                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            
//                                     <IconButton color="primary"
//                           onClick={() => handleQuantityChange(product.prodId, 1)}
//                         // sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
//                         >
//                           <AddIcon />
//                         </IconButton>


//                         <Typography variant="h6" sx={{ mx: 2, minWidth: '30px', textAlign: 'center' }}>
//                           {orderItem.count}
//                         </Typography>

//                         <IconButton
//                           color="primary"
//                           onClick={() => handleQuantityChange(product.prodId, -1)}
//                           disabled={orderItem.count <= 0}
//                         // sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
//                         >
//                           <RemoveIcon />
//                         </IconButton>

//                       </Box>

//                       <Button
//                         variant="outlined"
//                         startIcon={<InfoIcon />}
//                         onClick={() => handleOpenDetails(product)}
//                         fullWidth
//                         sx={{ mt: 'auto' }}
//                       >
//                         פרטים נוספים
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Paper>

//         {/* Order Summary and Checkout Section */}
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
//             סיום הזמנה
//           </Typography>

//           <Box onClick={(e)=>setListEmps(true)} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
//             <FormControl sx={{ m: 1, minWidth: " 250px"}} onClick={(e)=>setListEmps(true)}>
//               <InputLabel id="employee-select-label" >בחר עובד לטיפול בהזמנה</InputLabel>
//               <Select
//                 labelId="employee-select-label"
//                 id="employee-select"
//                 value={employee}
//                 label="בחר עובד לטיפול בהזמנה"
//                 onChange={handleEmployeeChange}
//                 // sx={{font:"blueviolet"}}-----------------------------------------------------------------------------------------------
//               >
//                 {employees?.map((emp) => (
//                   <MenuItem key={emp.ename} value={emp.ename}>
//                     {emp.ename}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<ShoppingCartIcon />}
//                 onClick={handleFinishOrder}
//                 disabled={myOrders.every(item => item.count === 0) }
//                 sx={{
//                   px:2,
//                   py: 3,
//                   borderRadius: 2,
//                   background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
//                   boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
//                   // color:"Highlight"-----------------------------------------------------------------------why this line isn't working
//                 }}
//               >
//                 סיים הזמנה
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>

//       {/* Product Details Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDetails}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedProduct && (
//           <>
//             <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
//               {selectedProduct.pname}
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     component="img"
//                     src={selectedProduct.ppicture
//                       // && selectedProduct.ppicture.length > 6 
//                       // ? selectedProduct.ppicture 
//                       // : 'https://via.placeholder.com/400x300?text=No+Image'
//                     }
//                     alt={selectedProduct.pname}
//                     sx={{
//                       width: '100%',
//                       borderRadius: 1,
//                       maxHeight: 300,
//                       objectFit: 'cover'
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="h6" gutterBottom>פרטי המוצר</Typography>
//                   <Typography variant="body1" paragraph>
//                     <strong>תיאור:</strong> {selectedProduct.pdescription}
//                   </Typography>
//                   <Typography variant="body1" paragraph>
//                     <strong>חברה:</strong> {selectedProduct.pcompany}
//                   </Typography>

//                   {/* Add more product details as needed */}
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDetails} color="primary">
//                 סגור
//               </Button>
//               <Button
//                 onClick={() => {
//                   const orderItem = myOrders.find(item => item.prodId === selectedProduct.prodId);
//                   handleQuantityChange(selectedProduct.prodId, 1);
//                   handleCloseDetails();
//                 }}
//                 color="primary"
//                 variant="contained"
//               >
//                 הוסף להזמנה
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </ThemeProvider>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/NewOrder.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getProductsThunk } from '../redux/slices/getProductsThunk';
import { addOrderThunk } from "../redux/slices/addOrderThunk";

export const NewOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const products = useSelector(state=>state.Products.productsList);
  const [categories, setCategories] = useState(['חומרי בניין', 'כלי עבודה', 'אינסטלציה', 'חשמל']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const CID = useSelector(state => state.user.CID);
  
  // אתחול ספריית האנימציות
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
    
    // בדיקה אם המשתמש מחובר
    if (CID === -1) {
      navigate('/login');
      return;
    }
    // פונקציה לטעינת מוצרים מהשרת
    dispatch(getProductsThunk());
    setLoading(false);
    }, []);
  
  

 
  

  
  // פונקציה להוספת מוצר לסל
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.prodId === product.prodId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.prodId === product.prodId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // פונקציה להסרת מוצר מהסל
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.prodId !== productId));
  };
  
  // פונקציה לעדכון כמות של מוצר בסל
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.prodId === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  // פונקציה לסינון מוצרים לפי קטגוריה וחיפוש
  const filteredProducts = products?.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.pname.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
  
  // חישוב סכום ההזמנה
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // פונקציה לשליחת ההזמנה
  const submitOrder = async () => {
    if (cart.length === 0) {
      alert('הסל ריק. אנא הוסף מוצרים לפני שליחת ההזמנה.');
      return;
    }
    
    try {
     
      dispatch(addOrderThunk({
                details: cart.map(item => ({
                  "prodId": item.prodId,
                  "prodName": "string",
                  "prodPic": "string",
                  "orderId": 0,
                  "count": item.quantity,
                  "cost": 0
                })),
                id: CID,
                  employeeId:1002// employee
              }));
     // אישור הזמנה
      alert('ההזמנה נשלחה בהצלחה!');
      setCart([]);
      navigate('/orders');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('אירעה שגיאה בשליחת ההזמנה. אנא נסה שנית.');
    }
  };
  
  // תצוגת טעינה
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>טוען מוצרים...</p>
      </div>
    );
  }
  
  return (
    <div className="new-order-page">
      {/* כותרת הדף */}
      <div className="order-header">
        <div className="container">
          <div className="header-content" data-aos="fade-up">
            <h1>הזמנה חדשה</h1>
            <p>בחר מוצרים מהקטלוג והוסף אותם להזמנה שלך</p>
          </div>
        </div>
        <div className="header-wave">
        </div>
      </div>
      
      {/* תוכן עיקרי */}
      <div className="order-content">
        <div className="container">
          <div className="order-grid">
            {/* חלק שמאלי - רשימת מוצרים */}
            <div className="products-section">
              <div className="filter-controls" data-aos="fade-up">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="חיפוש מוצרים..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <div className="category-filter">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">כל הקטגוריות</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div className="product-card" key={product.prodId} data-aos="fade-up">
                      <div className="product-image">
                        <img src={`${`https://localhost:7064/img/${product.ppicture}`}`} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <h3>{product.pname}</h3>
                        <p className="product-category">כלי עבודה</p> {/*{product.category} */}
                         <p className="product-price">₪ 10</p>{/*product.price.toFixed(2) */}
                        <p className="product-stock">במלאי: {product.psum}</p>
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        הוסף להזמנה <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-products-message">
                    <p>לא נמצאו מוצרים התואמים את החיפוש</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* חלק ימני - סל הקניות */}
            <div className="cart-section" data-aos="fade-left">
              <div className="cart-container">
                <h2>סל ההזמנה שלך</h2>
                
                {cart.length > 0 ? (
                  <>
                    <div className="cart-items">
                      {cart.map(item => (
                        <div className="cart-item" key={item.prodId}>
                          <div className="item-image">
                            <img src={`${process.env.PUBLIC_URL}${item.image}`} alt={item.pname} />
                          </div>
                          <div className="item-details">
                            <h4>{item.pname}</h4>
                            <p className="item-price">₪10</p>
                          </div>
                          <div className="item-quantity">
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.prodId, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.prodId, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="item-total">
                            ₪{(10 * item.quantity)}
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.prodId)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="cart-summary">
                      <div className="summary-row">
                        <span>סה"כ מוצרים:</span>
                        <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                      </div>
                      <div className="summary-row">
                        <span>סה"כ לתשלום:</span>
                        <span className="cart-total">₪100</span>
                      </div>
                    </div>
                    
                    <div className="cart-actions">
                      <button 
                        className="submit-order-btn pulse-animation"
                        onClick={submitOrder}
                      >
                        שלח הזמנה
                        </button>
                      <button 
                        className="clear-cart-btn"
                        onClick={() => setCart([])}
                      >
                        נקה סל
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-cart">
                    <i className="fas fa-shopping-cart"></i>
                    <p>הסל שלך ריק</p>
                    <p className="empty-cart-subtext">הוסף מוצרים מהקטלוג להזמנה שלך</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* מידע נוסף */}
      <div className="order-info-section">
        <div className="section-wave-top">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="container">
          <div className="info-grid">
            <div className="info-card" data-aos="fade-up" data-aos-delay="100">
              <div className="info-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>משלוחים</h3>
              <p>משלוחים מהירים לכל רחבי הארץ. הזמנות מעל 5,000 ש"ח - משלוח חינם!</p>
            </div>
            <div className="info-card" data-aos="fade-up" data-aos-delay="200">
              <div className="info-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <h3>תשלום</h3>
              <p>אפשרויות תשלום מגוונות: אשראי, העברה בנקאית, שוטף + 30/60/90.</p>
            </div>
            <div className="info-card" data-aos="fade-up" data-aos-delay="300">
              <div className="info-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>החזרות והחלפות</h3>
              <p>ניתן להחזיר מוצרים תוך 14 יום מקבלת ההזמנה, בהתאם למדיניות החברה.</p>
            </div>
            <div className="info-card" data-aos="fade-up" data-aos-delay="400">
              <div className="info-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>שירות לקוחות</h3>
              <p>צוות השירות שלנו זמין לענות על כל שאלה בימים א'-ה' בין השעות 8:00-17:00.</p>
            </div>
          </div>
        </div>
        <div className="section-wave-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* הזמנות קודמות */}
      <div className="previous-orders-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">הזמנות אחרונות שלך</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            לנוחיותך, תוכל לראות את ההזמנות האחרונות שביצעת ולהזמין שוב מוצרים שהזמנת בעבר
          </p>
          
          <div className="previous-orders-actions" data-aos="fade-up" data-aos-delay="200">
            <button className="view-all-orders-btn" onClick={() => navigate('/orders')}>
              צפה בכל ההזמנות <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* פוטר */}
      <footer className="order-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <p>© 2023 כל הזכויות שמורות לחברת בסיס לבית בע"מ</p>
            </div>
            <div className="footer-support">
              <p>
                <i className="fas fa-phone"></i> לתמיכה: 03-1234567
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
