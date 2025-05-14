import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../redux/slices/getOrdersThunk";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { getOrderDetailsThunk } from "../redux/slices/getOrderDetailsThunk";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { getOrdersForEmpThunk } from "../redux/slices/getOrdersForEmpThunk";
import { UpdateSendingThunk } from "../redux/slices/updateSending";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getNewOrdersForEmpThunk } from "../redux/slices/getNewOrdersForEmp";
import { assignOrdersToEmpThunk } from "../redux/slices/assignOrdersToEmpThunk";
import { getCompletedOrdersForEmpThunk } from "../redux/slices/getCompletedOrdersForEmpThunk";

export const EmpOrderList = () => {
  const EID = useSelector(state => state.user.EID);
  const ordersToSend = useSelector(state => state.Orders.myOrders);
  const details = useSelector(state => state.Orders.orderDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UnassignedOrders = useSelector(state => state.Orders.newOrders);
  const completedOrders = useSelector(state => state.Orders.completedOrders);
  const [hasDetails, setHasDetails] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [showCompletedOrders, setShowCompletedOrders] = useState(false);
  const [showUnassignedOrders, setShowUnassignedOrders] = useState(false);
  const [showUnassignedOrdersModal, setShowUnassignedOrdersModal] = useState(false);
  const [selectedUnassignedOrders, setSelectedUnassignedOrders] = useState([]);
  // const loadingUnassigned = false;
  // Custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        'Segoe UI',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#3f51b5',
            color: '#fff',
            fontWeight: 'bold',
          },
          root: {
            padding: '16px',
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

  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'rgba(63, 81, 181, 0.08)',
    },
    transition: 'background-color 0.2s ease',
  }));

  const fetchDetails = (ordId) => {
    dispatch(getOrderDetailsThunk(ordId));
  };

  // Initialize
  useEffect(() => {
    console.log(EID);
    dispatch(getOrdersForEmpThunk(EID));
    console.log(ordersToSend > 0);
  }, []);

  useEffect(() => {
    console.log(details);
    if (details && details.length > 0 && details[0]) {
      console.log("details[0]");
      console.log(details[0]);
      var updated = [];
      var c = hasDetails && hasDetails.length ? hasDetails.length : 0;
      for (let i = 0; i < c; i++) {
        updated.push(-1);
      }
      details.map((d, ind) => {
        console.log("d[0]");
        console.log(d[0]);
        var orderId = d[0] && d[0].orderId;
        if (orderId && ordersToSend) {
          ordersToSend.map((e, index) => {
            if (e.orderId === orderId) {
              updated[index] = ind;
            }
          });
        }
      });
      console.log(updated);
      setHasDetails(updated);
    }

    console.log("details");
    console.log(details);
  }, [details]);

  useEffect(() => {
    var arr = [];
    if (ordersToSend && ordersToSend.length > 0 && (!details || details.length === 0)) {
      ordersToSend.map(o => {
        arr.push(-1);
      });
      console.log("arrrrrr------", arr);
      setHasDetails(arr);
    }
  }, [ordersToSend]);

  const sendOrder = (orderId) => {
    dispatch(UpdateSendingThunk({ orderid: orderId, empid: EID }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImportCompletedOrders = () => {
    setShowCompletedOrders(true);
    dispatch(getCompletedOrdersForEmpThunk(EID));
  };

  const handleImportUnassignedOrders = () => {
    setShowUnassignedOrders(true);
    dispatch(getNewOrdersForEmpThunk());
    setShowUnassignedOrdersModal(true);
  };

  const handleSelectUnassignedOrder = (orderId, isSelected) => {
    if (isSelected) {
      setSelectedUnassignedOrders([...selectedUnassignedOrders, orderId]);
    } else {
      setSelectedUnassignedOrders(selectedUnassignedOrders.filter(id => id !== orderId));
    }
  };

  const handleImportSelectedUnassignedOrders = () => {
    console.log("assignedOrders");
    if (selectedUnassignedOrders.length > 0) {
      console.log("assignedOrders");
      dispatch(assignOrdersToEmpThunk({ 
        empID: EID, 
        orderIds: selectedUnassignedOrders 
      })).then(() => {
        dispatch(getOrdersForEmpThunk(EID));
        setShowUnassignedOrdersModal(false);
        setSelectedUnassignedOrders([]);
      });
      
      setShowUnassignedOrdersModal(false);
      setSelectedUnassignedOrders([]);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            ניהול הזמנות
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<CheckCircleIcon />}
              onClick={handleImportCompletedOrders}
            >
              ייבוא הזמנות שבוצעו
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<PersonOffIcon />}
              onClick={handleImportUnassignedOrders}
            >
              ייבוא הזמנות לא משויכות
            </Button>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="הזמנות לשליחה" icon={<LocalShippingIcon />} iconPosition="start" />
            {showCompletedOrders && <Tab label="הזמנות שבוצעו" icon={<CheckCircleIcon />} iconPosition="start" />}
            {showUnassignedOrders && <Tab label="הזמנות לא משויכות" icon={<PersonOffIcon />} iconPosition="start" />}
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <>
            {ordersToSend && ordersToSend.length > 0 ? (
              <Card elevation={3}>
                <CardContent>
                  <TableContainer component={Paper} sx={{ direction: "rtl", borderRadius: 2, overflow: "hidden" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="orders table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">מספר הזמנה</TableCell>
                          <TableCell align="right">תאריך</TableCell>
                          <TableCell align="right">סטטוס</TableCell>
                          <TableCell align="right">שם הלקוח</TableCell>
                          <TableCell align="right">מייל לפניות</TableCell>
                          <TableCell align="right">פרטי הזמנה</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ordersToSend?.map((row, index) => (
                          <StyledTableRow key={row.orderId}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                              <Chip label={row.orderId} color="primary" variant="outlined" />
                            </TableCell>
                            <TableCell align="right">{row.orderDate}</TableCell>
                            <TableCell align="right">
                              <Tooltip title="אשר בעת שליחת המשלוח">
                                <Button
                                  variant="contained"
                                  color="success"
                                  startIcon={<SendIcon />}
                                  onClick={() => sendOrder(row.orderId)}
                                  sx={{ borderRadius: '20px' }}
                                >
                                  שלח
                                </Button>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="right">{row.nameToConnection}</TableCell>
                            <TableCell align="right">{row.emailToConnection}</TableCell>
                            <TableCell align="right">
                              {hasDetails[index] !== -1 ? (
                                <Box sx={{ maxHeight: 200, overflowY: 'auto', bgcolor: 'background.paper', borderRadius: 2, p: 1 }}>
                                  <List>
                                    {details[hasDetails[index]]?.map((o, i) => (
                                      <ListItem key={i} sx={{ borderBottom: '1px solid #eee', py: 1 }}>
                                        <ListItemAvatar>
                                          <Avatar sx={{ bgcolor: 'primary.main' }}>{o.prodPic}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                          primary={<Typography variant="subtitle1" fontWeight="bold">{o.prodName}</Typography>}
                                          secondary={<Typography variant="body2">כמות: {o.count}</Typography>}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  startIcon={<VisibilityIcon />}
                                  onClick={() => fetchDetails(row.orderId)}
                                  fullWidth
                                >
                                  הצג פרטים
                                </Button>
                              )}
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ) : (
              <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                <AlertTitle>אין הזמנות</AlertTitle>
                לא נמצאו הזמנות שלא בוצעו עבור עובד זה
              </Alert>
            )}
          </>
        )}

        {tabValue === 1 && showCompletedOrders && (
          // <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
          //   <AlertTitle>הזמנות שבוצעו</AlertTitle>
          //   כאן יוצגו ההזמנות שכבר בוצעו לאחר ייבוא הנתונים
          //   </Alert>
          <>
          {completedOrders && completedOrders.length > 0 ? (
            <Card elevation={3}>
              <CardContent>
                <TableContainer component={Paper} sx={{ direction: "rtl", borderRadius: 2, overflow: "hidden" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="orders table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">מספר הזמנה</TableCell>
                        <TableCell align="right">תאריך</TableCell>
                        <TableCell align="right">סטטוס</TableCell>
                        <TableCell align="right">שם הלקוח</TableCell>
                        <TableCell align="right">מייל לפניות</TableCell>
                        <TableCell align="right">פרטי הזמנה</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {completedOrders?.map((row, index) => (
                        <StyledTableRow key={row.orderId}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            <Chip label={row.orderId} color="primary" variant="outlined" />
                          </TableCell>
                          <TableCell align="right">{row.orderDate}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="אשר בעת שליחת המשלוח">
                              <span
                                variant="contained"
                                color="success"
                                startIcon={<SendIcon />}
                                onClick={() => sendOrder(row.orderId)}
                                sx={{ borderRadius: '20px' }}
                              >
                                שלח
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right">{row.nameToConnection}</TableCell>
                          <TableCell align="right">{row.emailToConnection}</TableCell>
                          <TableCell align="right">
                            פרטי ההזמנה הישנה:(
                           </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
              <AlertTitle>אין הזמנות</AlertTitle>
              לא נמצאו הזמנות שכבר בוצעו עבור עובד זה
            </Alert>
          )}
        </>
        )}

        {tabValue === 2 &&
         showUnassignedOrders && (
          // <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
          //   <AlertTitle>הזמנות לא משויכות</AlertTitle>
          //   כאן יוצגו ההזמנות שלא משויכות לאף עובד לאחר ייבוא הנתונים
          // </Alert>
          <>
          {UnassignedOrders && UnassignedOrders.length > 0 ? (
            <Card elevation={3}>
              <CardContent>
                <TableContainer component={Paper} sx={{ direction: "rtl", borderRadius: 2, overflow: "hidden" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="orders table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">מספר הזמנה</TableCell>
                        <TableCell align="right">תאריך</TableCell>
                        <TableCell align="right">סטטוס</TableCell>
                        <TableCell align="right">שם הלקוח</TableCell>
                        <TableCell align="right">מייל לפניות</TableCell>
                        <TableCell align="right">פרטי הזמנה</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {UnassignedOrders?.map((row, index) => (
                        <StyledTableRow key={row.orderId}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            <Chip label={row.orderId} color="primary" variant="outlined" />
                          </TableCell>
                          <TableCell align="right">{row.orderDate}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="אשר בעת שליחת המשלוח">
                              <span
                                variant="contained"
                                color="success"
                                startIcon={<SendIcon />}
                                onClick={() => sendOrder(row.orderId)}
                                sx={{ borderRadius: '20px' }}
                              >
                                שלח
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right">{row.nameToConnection}</TableCell>
                          <TableCell align="right">{row.emailToConnection}</TableCell>
                          <TableCell align="right">
                            פרטי ההזמנה הישנה
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
              <AlertTitle>אין הזמנות</AlertTitle>
              לא נמצאו הזמנות שכבר בוצעו עבור עובד זה
            </Alert>
          )}
        </>
        )}

        {/* Modal for completed orders - would be implemented when backend is ready */}
        {/* <Dialog open={showCompletedOrdersModal} onClose={() => setShowCompletedOrdersModal(false)}>
          <DialogTitle>הזמנות שבוצעו</DialogTitle>
          <DialogContent>
            <DialogContentText>
              בחר הזמנות שברצונך לייבא
            </DialogContentText>
            <List>
              {completedOrders.map(order => (
                <ListItem key={order.orderId}>
                  <ListItemText primary={`הזמנה מספר ${order.orderId}`} secondary={order.orderDate} />
                  <Checkbox onChange={(e) => handleSelectCompletedOrder(order.orderId, e.target.checked)} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCompletedOrdersModal(false)}>ביטול</Button>
            <Button onClick={handleImportSelectedCompletedOrders} variant="contained">ייבא</Button>
          </DialogActions>
        </Dialog> */}

        {/* Modal for unassigned orders - would be implemented when backend is ready */}
        <Dialog open={showUnassignedOrdersModal} onClose={() => setShowUnassignedOrdersModal(false)}>
          <DialogTitle>הזמנות לא משויכות</DialogTitle>
          <DialogContent>
            <DialogContentText>
              בחר הזמנות שברצונך לייבא
            </DialogContentText>
            <List>
              {UnassignedOrders?.map(order => (
                <ListItem key={order.orderId}>
                  <ListItemText primary={`הזמנה מספר ${order.orderId}`} secondary={order.orderDate} />
                  <Checkbox onChange={(e) => handleSelectUnassignedOrder(order.orderId, e.target.checked)} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowUnassignedOrdersModal(false)}>ביטול</Button>
            <Button onClick={handleImportSelectedUnassignedOrders} variant="contained">ייבא</Button>
          </DialogActions>
        </Dialog>

      </Container>
    </ThemeProvider>
  );
};
