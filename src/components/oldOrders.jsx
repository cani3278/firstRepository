// import { useDispatch, useSelector } from "react-redux";
// import { getOrdersThunk } from "../redux/slices/getOrdersThunk";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from "react";
// import { getOrderDetailsThunk } from "../redux/slices/getOrderDetailsThunk";
// import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import { useNavigate } from "react-router-dom";
// export const OldOrders = () => {


//   const id = useSelector(state => state.user.CID);
//   const EID = useSelector(state => state.user.EID);
//   const olds = useSelector(state => state.Orders.myOrders);
//   const details = useSelector(state => state.Orders.orderDetail);
//   const dispatch = useDispatch();

//   //עבור כפתור תמונה...
//   const ImageButton = styled(ButtonBase)(({ theme }) => ({
//     position: 'relative',
//     height: 200,
//     [theme.breakpoints.down('sm')]: {
//       width: '100% !important', // Overrides inline-style
//       height: 100,
//     },
//     '&:hover, &.Mui-focusVisible': {
//       zIndex: 1,
//       '& .MuiImageBackdrop-root': {
//         opacity: 0.15,
//       },
//       '& .MuiImageMarked-root': {
//         opacity: 0,
//       },
//       '& .MuiTypography-root': {
//        // border: '4px solid currentColor',
//       },
//     },
//   }));

//   const ImageSrc = styled('span')({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
//   });

//   const Image = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
//   }));

//   const ImageBackdrop = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create('opacity'),
//   }));

//   const ImageMarked = styled('span')(({ theme }) => ({
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
//   }));
//   const theme = createTheme({
//     typography: {
//       fontFamily: [
//          '"Segoe UI Symbol"',   ]
//     },
//   });
  
//   const [hasDetails, setHasDetails] = useState([])
//   const fetchDetails = (ordId) => {
//     dispatch(getOrderDetailsThunk(ordId))
//   }
//   //מעדכן לאילו הזמנות יש פירוט משתנה כל פעם שמתקבל שינוי
//   useEffect(() => {
//     console.log(details);
//     if (details[0]) {
//    console.log("details[0]");
//    console.log(details[0]);
//     var updated=[];
//     var c=hasDetails.length;
//    for (let i = 0; i < c; i++) {
//     updated.push(-1);    
//    }
//    details.map((d,ind)=>{
//     console.log("d[0]");
//     console.log(d[0]);
//     var orderId = d[0].orderId;
//    olds.map((e,index) => {
//       if (e.orderId === orderId) {
//         updated[index]=ind;
//       }
//      })
//     })
//     console.log(updated);
//     setHasDetails(updated)   
//     }
    
   
//     console.log("details");
//     console.log(details);
   
//   }, [details])//,hasDetails

//  //אתחול 
//   useEffect(() => {
//     console.log(id);
//     dispatch(getOrdersThunk(id));
//    console.log(olds>0);
   
// }, [])
//  useEffect(()=>{
//   var arr = [];
//   if(olds.length>0&&details.length===0){
//   olds.map(o => {
//     arr.push(-1)
//   })
//   console.log("arrrrrr------",arr);
//   setHasDetails(arr);
// }
//  },[olds])
//  const navigate = useNavigate();
//   return <div >
//      <ThemeProvider theme={theme}>
//       {EID!=0&& <button onClick={()=>navigate("../")} >חזרה לדף הניהול</button>}
//       {olds.length>0&&
//      <TableContainer component={Paper} sx={{ direction: "rtl" ,overflow:"hidden"}}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table"
//       >
//         <TableHead>
//           <TableRow>
//             <TableCell align="right" style={{fontFamily:"cursive"}} >orderNum</TableCell>
//             <TableCell align="right" style={{fontFamily:"cursive"}}>Date</TableCell>
//             <TableCell align="right" style={{fontFamily:"cursive"}}>sent</TableCell>
//             <TableCell align="right" style={{fontFamily:"cursive"}}>עובד אחראי</TableCell>
//             <TableCell align="right" style={{fontFamily:"cursive"}}>מייל לפניות ישירות בנושא</TableCell>
//             <TableCell align="right" style={{fontFamily:"cursive"}}>Details</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {olds.map((row, index) => (
//             <TableRow  key={row.orderId} >
//               <TableCell component="th" scope="row" sx={{fontFamily:"cursive",fontSize:"large",width:"15%"}}> {row.orderId}</TableCell>
//               <TableCell align="right" sx={{width:"15%",fontFamily:"cursive",fontSize:"large"}} >{row.orderDate}</TableCell>
//               <TableCell align="right" sx={{width:"15%",fontFamily:"cursive"}}>
//                 {row.sent ? <><span style={{fontSize:"xxx-large"}}>✅</span><br /><span sx={{fontSize:"medium",fontFamily:"cursive"}}> המשלוח כבר בדרך אליך</span> </> 
//               :<><span style={{fontSize:"xxx-large"}}>❎</span><br /><span sx={{fontSize:"medium",fontFamily:"cursive"}}>  המשלוח עתיד להישלח ביום העסקים הבא</span> </>  }</TableCell>
//               <TableCell align="right" sx={{width:"15%",fontFamily:"cursive",fontSize:"large"}} >{row.nameToConnection}</TableCell>
//               <TableCell align="right" sx={{width:"15%",fontFamily:"cursive",fontSize:"large"}} >{row.emailToConnection}</TableCell>
//               <TableCell align="right">
//                 {hasDetails[index]!==-1 &&
//                 <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',fontFamily:"cursive",fontSize:"large" }}>
//                 { details[hasDetails[index]]?.map(o => 
//                  <ListItem> <ListItemAvatar> <Avatar>  {o.prodPic} </Avatar> </ListItemAvatar>
//                   <ListItemText primary={o.prodName} secondary={o.count} />
//                 </ListItem> )  } </List>}
//                 {hasDetails[index]===-1 && <>
//                  <ImageButton focusRipple style={{ width:"100%",fontFamily:"cursive" }} onClick={() => fetchDetails(row.orderId)} >
//                     <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/pppp.jpg"})` }} />
//                     <ImageBackdrop className="MuiImageBackdrop-root" />
//                     <Image> <Typography  component="span"  variant="subtitle1" color="inherit"  sx={(theme) => ({
//                         fontFamily:"cursive",
//                         position: 'relative', p: 4, pt: 2, pb: `calc(${theme.spacing(1)} + 6px)`,  })}>
//                       to see your order details
//                       <ImageMarked className="MuiImageMarked-root" />
//                     </Typography>  </Image> </ImageButton>  </>}
//               </TableCell>
//             </TableRow>))}
//         </TableBody>
//       </Table>
//     </TableContainer>}
//     {olds.length===0&&
//     <h1 style={{fontSize:"100px"}}>מצטערים 😔😔😔😔😔😔 לא נמצאו הזמנות קודמות עבור לקוח זה </h1>
//     }
//     </ThemeProvider>
//   </div>

// }
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../redux/slices/getOrdersThunk";
import { getOrderDetailsThunk } from "../redux/slices/getOrderDetailsThunk";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

// MUI Components
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  ThemeProvider, createTheme, styled, ButtonBase, Typography, List, ListItem,
  ListItemText, ListItemAvatar, Avatar, Box, Container, Button, Divider, Chip
} from '@mui/material';

// Icons
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';

/**
 * Renders a comprehensive view of a user's previous orders with detailed interactions and styling.
 * 
 * @component
 * @description Displays a table of past orders with options to view order details, print orders, 
 * and navigate back to management page. Supports dynamic order detail fetching and custom theming.
 * 
 * @returns {React.ReactElement} A themed container with order history table or "no orders" message
 * 
 * @uses Redux for state management
 * @uses Material-UI for styling and components
 * @uses react-to-print for printing functionality
 * 
 * @example
 * // Automatically rendered in customer order history view
 * <OldOrders />
 */
export const OldOrders = () => {
  const id = useSelector(state => state.user.CID);
  const EID = useSelector(state => state.user.EID);
  const olds = useSelector(state => state.Orders.myOrders);
  const details = useSelector(state => state.Orders.orderDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasDetails, setHasDetails] = useState([]);
  const printRef = useRef();

  // Custom theme with brown and red tones
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8B4513', // SaddleBrown
        light: '#A0522D', // Sienna
        dark: '#5D2E0C', // Darker brown
      },
      secondary: {
        main: '#CD5C5C', // IndianRed
        light: '#F08080', // LightCoral
        dark: '#A52A2A', // Brown
      },
      background: {
        default: '#FFF8F0', // Light cream
        paper: '#FFF8F0',
      },
      text: {
        primary: '#3E2723', // Dark brown
        secondary: '#5D4037', // Medium brown
      },
    },
    typography: {
      fontFamily: [
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: {
        fontWeight: 600,
        color: '#5D4037',
      },
      h5: {
        fontWeight: 500,
        color: '#8B4513',
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#8B4513',
            color: '#FFF8F0',
            fontWeight: 'bold',
          },
          root: {
            padding: '16px',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: 'rgba(139, 69, 19, 0.05)',
            },
            '&:hover': {
              backgroundColor: 'rgba(139, 69, 19, 0.1)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 'bold',
          },
        },
      },
    },
  });

  // Styled components
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    transition: 'all 0.3s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover, &.Mui-focusVisible': {
      transform: 'scale(1.03)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      '& .MuiImageBackdrop-root': {
        opacity: 0.3,
      },
      '& .MuiTypography-root': {
        transform: 'scale(1.05)',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  }));

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 248, 240, 0.8)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 248, 240, 1)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)',
    },
  }));

  const PageHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
    },
  }));

  const fetchDetails = (ordId) => {
    dispatch(getOrderDetailsThunk(ordId));
  };

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'הזמנות קודמות',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #3E2723;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background-color: #8B4513 !important;
          color: white !important;
          padding: 10px;
          text-align: right;
          font-weight: bold;
          border: 1px solid #ddd;
        }
        td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: right;
        }
        tr:nth-child(even) {
          background-color: rgba(139, 69, 19, 0.05);
        }
        h1, h2 {
          color: #8B4513;
        }
        .print-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .print-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #5D4037;
        }
      }
    `,
  });

  // Update details state when details change
  useEffect(() => {
    if (details[0]) {
      const updated = Array(hasDetails.length).fill(-1);
      
      details.forEach((d, ind) => {
        const orderId = d[0].orderId;
        olds.forEach((e, index) => {
          if (e.orderId === orderId) {
            updated[index] = ind;
          }
        });
      });
      
      setHasDetails(updated);
    }
  }, [details]);

  // Initialize
  useEffect(() => {
    dispatch(getOrdersThunk(id));
  }, []);

  // Initialize hasDetails array
  useEffect(() => {
    if (olds.length > 0 && details.length === 0) {
      const arr = Array(olds.length).fill(-1);
      setHasDetails(arr);
    }
  }, [olds]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageHeader>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            הזמנות קודמות
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {EID !== 0 && (
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("../")}
              >
                חזרה לדף הניהול
              </Button>
            )}
            {olds.length > 0 && (
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                הדפסה
              </Button>
            )}
          </Box>
        </PageHeader>

        <div ref={printRef}>
          {olds.length > 0 ? (
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
              <TableContainer sx={{ direction: "rtl" }}>
                <Table aria-label="orders table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ReceiptIcon fontSize="small" />
                          <Typography variant="subtitle1">מספר הזמנה</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon fontSize="small" />
                          <Typography variant="subtitle1">תאריך</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocalShippingIcon fontSize="small" />
                          <Typography variant="subtitle1">סטטוס משלוח</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon fontSize="small" />
                          <Typography variant="subtitle1">עובד אחראי</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" />
                          <Typography variant="subtitle1">מייל לפניות</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VisibilityIcon fontSize="small" />
                          <Typography variant="subtitle1">פרטי הזמנה</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {olds.map((row, index) => (
                      <TableRow key={row.orderId}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body1" fontWeight="medium">
                            {row.orderId}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {row.orderDate}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {row.sent ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Chip 
                                icon={<LocalShippingIcon />} 
                                label="נשלח" 
                                color="success" 
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                המשלוח כבר בדרך אליך
                              </Typography>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Chip 
                                icon={<CancelIcon />} 
                                label="טרם נשלח" 
                                color="warning" 
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                המשלוח עתיד להישלח ביום העסקים הבא
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {row.nameToConnection}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1" sx={{ direction: 'ltr', textAlign: 'right' }}>
                            {row.emailToConnection}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {hasDetails[index] !== -1 ? (
                            <List sx={{ width: '100%', maxWidth: 360, p: 0 }}>
                              {details[hasDetails[index]]?.map((o, i) => (
                                <StyledListItem key={i}>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                      {o.prodPic}
                                    </Avatar>
                                  </ListItemAvatar>
                                 
                                  <ListItemText 
                                    primary={<Typography variant="body1" fontWeight="medium">{o.prodName}</Typography>}
                                    secondary={<Typography variant="body2">כמות: {o.count}</Typography>}
                                  />
                                  </StyledListItem>
                              ))}
                            </List>
                          ) : (
                            <ImageButton 
                              focusRipple 
                              onClick={() => fetchDetails(row.orderId)}
                              sx={{ width: '100%' }}
                            >
                              <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/pppp.jpg"})` }} />
                              <ImageBackdrop className="MuiImageBackdrop-root" />
                              <Image>
                                <Typography
                                  component="span"
                                  variant="subtitle1"
                                  color="inherit"
                                  sx={{
                                    position: 'relative',
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <VisibilityIcon />
                                  צפייה בפרטי ההזמנה
                                </Typography>
                              </Image>
                            </ImageButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2, 
                textAlign: 'center',
                backgroundColor: 'rgba(205, 92, 92, 0.05)',
                border: '1px solid rgba(205, 92, 92, 0.2)'
              }}
            >
              <Typography variant="h5" color="secondary.dark" gutterBottom>
                לא נמצאו הזמנות קודמות
              </Typography>
              <Typography variant="body1" color="text.secondary">
                מצטערים, לא נמצאו הזמנות קודמות עבור לקוח זה
              </Typography>
              <Box 
                component="img" 
                src={`${process.env.PUBLIC_URL}/pppp.jpg`}
                alt="No orders"
                sx={{ 
                  mt: 3, 
                  maxWidth: '200px',
                  opacity: 0.7,
                  borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </Paper>
          )}

          {/* Print-only footer */}
          <Box sx={{ mt: 4, display: 'none', '@media print': { display: 'block' } }}>
            <Divider />
            <Box className="print-footer" sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                הודפס בתאריך: {new Date().toLocaleDateString('he-IL')}
              </Typography>
            </Box>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default OldOrders;
