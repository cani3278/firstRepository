import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsThunk } from "../redux/slices/getProductsThunk";
import { addOrderThunk } from "../redux/slices/addOrderThunk";
import './newOrder.css';

// Material UI imports
import { 
  ThemeProvider, 
  createTheme, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Container,
  Divider,
  Chip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@fontsource/roboto';

export const NewOrder = () => {
  const products = useSelector(state => state.Products.productsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CID = useSelector(state => state.user.CID);
  //const employees = useSelector(state => state.emp.empList);
  
  const [myOrders, setMyOrders] = useState([]);
  const [employee, setEmployee] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  // Custom theme with RTL support
  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: [
        'Roboto',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#f5f5f5',
      },
    },
  });

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const initialOrders = products.map(p => ({
        prodId: p.prodId,
        prodName: p.pname,
        prodPic: p.ppicture,
        orderId: 0,
        count: 0,
        cost: 0
      }));
      setMyOrders(initialOrders);
    }
  }, [products]);

  useEffect(() => {
    // Calculate order total whenever orders change
    const total = myOrders.reduce((sum, item) => {
      const product = products.find(p => p.prodId === item.prodId);
      return sum + (item.count * (product?.pprice || 0));
    }, 0);
    setOrderTotal(total);
  }, [myOrders, products]);

  const handleQuantityChange = (prodId, change) => {
    setMyOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.prodId === prodId) {
          const newCount = Math.max(0, order.count + change);
          return { ...order, count: newCount };
        }
        return order;
      })
    );
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDialog(false);
  };

  const handleEmployeeChange = (event) => {
    setEmployee(event.target.value);
  };

  const handleFinishOrder = () => {
    const orderItems = myOrders.filter(item => item.count > 0);
    
    if (orderItems.length > 0) {
      dispatch(addOrderThunk({
        details: orderItems,
        id: CID,
        employeeId: employee
      }));
      navigate("/Home");
    } else {
      alert("לא נקלטה הזמנה");
    }
  };
// הוסף פונקציה זו לקומפוננטה שלך
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/300x180/cccccc/333333?text=No+Image';
};

// ובתוך ה-CardMedia, שנה ל:


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            הזמנה חדשה
          </Typography>
          <Divider sx={{ mb: 4 }}>
            <Chip label="בחר מוצרים" color="primary" />
          </Divider>

          <Grid container spacing={3}>
            {products.map((product) => {
              const orderItem = myOrders.find(item => item.prodId === product.prodId) || { count: 0 };
              
              return (
                <Grid item xs={12} sm={6} md={3} key={product.prodId}>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    {/* <CardMedia
                      component="div"
                      sx={{
                        height: 180,
                        backgroundImage: `url(${product.ppicture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    > */}
                    <CardMedia
  component="img"
  height={180}
  image={product.ppicture}
  alt={product.pname}
  onError={handleImageError}
  sx={{
    objectFit: 'cover',
    objectPosition: 'center',
  }}
/>
                      {/* <Box 
                        sx={{ 
                          position: 'absolute', 
                          bottom: 0, 
                          width: '100%', 
                          background: 'rgba(0,0,0,0.6)',
                          p: 1
                        }}
                      >
                        <Typography variant="h6" component="div" sx={{ color: 'teal', fontWeight: 'bold' }}>
                          {product.pname}
                        </Typography>
                      </Box> */}
                  
                    
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.pcompany}
                      </Typography> */}
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {/* <IconButton 
                          color="primary" 
                          onClick={() => handleQuantityChange(product.prodId, 1)}
                          sx={{ backgroundColor: '#e3f2fd', '&:hover': { backgroundColor: '#bbdefb' } }}
                        >
                          <AddIcon />
                        </IconButton> */}
                        <IconButton  color="primary"
                            onClick={() => handleQuantityChange(product.prodId, 1)}
                            // sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
                          >
                            <AddIcon />
                          </IconButton>

                        
                        <Typography variant="h6" sx={{ mx: 2, minWidth: '30px', textAlign: 'center' }}>
                          {orderItem.count}
                        </Typography>
                        
                        {/* <IconButton 
                          color="primary" 
                          onClick={() => handleQuantityChange(product.prodId, -1)}
                          disabled={orderItem.count <= 0}
                          sx={{ backgroundColor: '#e3f2fd', '&:hover': { backgroundColor: '#bbdefb' } }}
                        >
                          <RemoveIcon />
                        </IconButton> */}
                        <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(product.prodId, -1)}
                        disabled={orderItem.count <= 0}
                        // sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
                      >
                        <RemoveIcon />
                      </IconButton>

                      </Box>
                      
                      <Button
                        variant="outlined"
                        startIcon={<InfoIcon />}
                        onClick={() => handleOpenDetails(product)}
                        fullWidth
                        sx={{ mt: 'auto' }}
                      >
                        פרטים נוספים
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>

        {/* Order Summary and Checkout Section */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            סיום הזמנה
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="employee-select-label">בחר עובד לטיפול בהזמנה</InputLabel>
              <Select
                labelId="employee-select-label"
                id="employee-select"
                value={employee}
                label="בחר עובד לטיפול בהזמנה"
                onChange={handleEmployeeChange}
              >
                {/* {employees?.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
              {/* <Typography variant="h6" sx={{ mr: 2 }}>
                סה"כ להזמנה: ₪{orderTotal.toFixed(2)}
              </Typography> */}
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleFinishOrder}
                disabled={myOrders.every(item => item.count === 0) || !employee}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                }}
              >
                סיים הזמנה
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Product Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
              {selectedProduct.pname}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box 
                    component="img"
                    src={selectedProduct.ppicture 
                      // && selectedProduct.ppicture.length > 6 
                      // ? selectedProduct.ppicture 
                      // : 'https://via.placeholder.com/400x300?text=No+Image'
                    }
                    alt={selectedProduct.pname}
                    sx={{ 
                      width: '100%', 
                      borderRadius: 1,
                      maxHeight: 300,
                      objectFit: 'cover'
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>פרטי המוצר</Typography>
                  <Typography variant="body1" paragraph>
                    <strong>תיאור:</strong> {selectedProduct.pdescription}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>חברה:</strong> {selectedProduct.pcompany}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>מחיר:</strong> ₪{selectedProduct.pprice || 'לא צוין'}
                  </Typography>
                  
                  {/* Add more product details as needed */}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="primary">
                סגור
              </Button>
              <Button 
                onClick={() => {
                  const orderItem = myOrders.find(item => item.prodId === selectedProduct.prodId);
                  handleQuantityChange(selectedProduct.prodId, 1);
                  handleCloseDetails();
                }} 
                color="primary" 
                variant="contained"
              >
                הוסף להזמנה
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
};


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { getProductsThunk } from "../redux/slices/getProductsThunk";
// import './newOrder.css'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { addOrderThunk } from "../redux/slices/addOrderThunk";
// import '@fontsource/roboto';
// import { ThemeProvider, createTheme } from "@mui/material";
// import { Image } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// export const NewOrder = () => {

// //  בקשה לעיצוב הקומפוננטה אני רוצה עיצוב   רספונסיבי UIUX 
// // דיב שהרקע שלו היא תמונת המוצר ועליו כתוב שם המוצר ומתחת השם יופיע כמות ההזמנה עם פלוס להוספה ומינוס להורדה ומתחת כפתור לפרטים נוספים שיפתח 
// //דיאלוג שבו יוצגו הפרטים הנוספים סה"כ 4 מוצרים בשורה 
// //וכן בתחתית הדף כפתור יפה לסיום ההזמנה ותיבת בחירת עובד מתוך רשימה
//   const products = useSelector(state => state.Products.productsList);
//   const dispatch = useDispatch();
//   const [prodNum, setProdNum] = useState(0);
//   const [myOrders, setMyOrders] = useState([]);
//   const CID = useSelector(state => state.user.CID);
//   const employees = useSelector(state => state.emp.empList);
//   const [employee,setEmployee] =useState("");


//   const add = (prod, num) => {
//     let t = 0;
//     console.log(prod);
//     var arr = [
//     ]
//     arr = myOrders.map(order => {
//       if (order?.prodId === prod) {
//         var newO = {
//           "prodId": order?.prodId,
//           "prodName": "",
//             "prodPic": "",
//             "orderId": 0,
//             "count":  parseInt(num),
//             "cost": 0
//          }
//         return newO
//       }
//       else return order

//     })
//     setMyOrders(arr);
//     console.log("myOrders");
//     console.log(myOrders);
//   }


//   useEffect(() => {
//     dispatch(getProductsThunk());
//   }, [])
//   useEffect(() => {
//     if (products.length > 0) {
//       // myOrders=[];
//       products?.map(p => myOrders.push(
//         {
//           "prodId": p.prodId,
//             "prodName": "",
//             "prodPic": "",
//             "orderId": 0,
//             "count": 0,
//             "cost": 0
//         }))
//       setProdNum(10)
//     }
//   }, [products])

//   useEffect(() => {
//     setMyOrders(myOrders);
//   }, [prodNum])

//   const navigate = useNavigate();
//   const finish = () => {
//     var list=myOrders.filter(e=>e.count!==0);
//     if (list.length>0) {
//       dispatch(addOrderThunk({details:list,id:CID}));
//     }
//     navigate("/Home")
//   }
//   const theme = createTheme({
//     typography: {
//       fontFamily: [
//          '"Segoe UI Symbol"',   ]
//     },
//   });

//   return<div>
//     <ThemeProvider theme={theme}>
    


//       <TableContainer component={Paper} style={{ direction: "rtl", overflow: "hidden" }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>product</TableCell>
//               <TableCell align="right">description</TableCell>
//               <TableCell align="right">company</TableCell>
//               <TableCell align="right">picture</TableCell>
//               <TableCell align="right"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((row, index) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
//                 <TableCell component="th" scope="row">
//                   {row.pname}
//                 </TableCell>
//                 <TableCell align="right">{row.pdescription}</TableCell>
//                 <TableCell align="right">{row.pcompany}</TableCell>
//                {row.ppicture.length>6&&
//                      <Image style={{ backgroundImage: `url(${row.ppicture})`,height:'120px' }} />
//                  //   <img src={row.ppicture} alt="" />
//                }
//                 {row.ppicture.length<6&&<TableCell align="right">{row.ppicture}</TableCell>
// }
//                 <TableCell align="right">
//                   <button onClick={(e) => add(myOrders[index]?.prodId, 1)}>addToOrder</button>
//                   <input type="number" value={myOrders[index]?.Count} onChange={(e) => { add(myOrders[index]?.prodId, e.target.value) }} /></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//    {/* תיבה בה בוחרים עובד מתוך רשימה */}
//       <button onClick={e => finish()}>finish and order</button>
//       </ThemeProvider>
      
//   </div>

// }


// {/* <button>save the order</button> 
//   <table style={{ direction: "rtl" }} >
//     <thead>
//       <tr>
//         <td>name</td>
//         <td>details</td>
//         <td>company</td>
//         <td>picture</td>
//       </tr></thead>
//     <tbody>
//       {products.map((p, index) =>
//         <tr>
//           <td>{p.pname}</td>
//           <td>{p.pdescription}</td>
//           <td>{p.pcompany}</td>
//           <td>{p.ppicture}</td>
//           <td>
//             <button onClick={(e) => add(p.prodid, index)}>addToOrder</button>
//             <input type="number" value={myOrders[index]?.Count} onChange={(e) => { add(myOrders[index].prodId,e.target.value)}} />

//           </td>
//         </tr>
//       )
//       }</tbody>
//   </table>*/}