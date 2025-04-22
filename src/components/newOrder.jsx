import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProductsThunk } from "../redux/slices/getProductsThunk";
import './newOrder.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { addOrderThunk } from "../redux/slices/addOrderThunk";
import '@fontsource/roboto';
import { ThemeProvider, createTheme } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import HandymanIcon from '@mui/icons-material/Handyman';
import ConstructionIcon from '@mui/icons-material/Construction';
import CableIcon from '@mui/icons-material/Cable';
import BuildIcon from '@mui/icons-material/Build';
import { Image } from "@mui/icons-material";

export const NewOrder = () => {


  const products = useSelector(state => state.Products.productsList);
  const dispatch = useDispatch();
  const [prodNum, setProdNum] = useState(0);
  const [myOrders, setMyOrders] = useState([]);
  const CID = useSelector(state => state.user.CID);

  const add = (prod, num) => {
    let t = 0;
    console.log(prod);
    var arr = [
      //   {
      //   "prodId": 0,
      //   "Count": 0
      // }
    ]
    arr = myOrders.map(order => {
      if (order?.prodId === prod) {
        var newO = {
          "prodId": order?.prodId,
          "prodName": "",
            "prodPic": "",
            "orderId": 0,
            "count":  parseInt(num),
            "cost": 0
         }
        return newO
      }
      else return order

    })
    setMyOrders(arr);
    console.log("myOrders");
    console.log(myOrders);
  }


  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])
  useEffect(() => {
    if (products.length > 0) {
      // myOrders=[];
      products?.map(p => myOrders.push(
        {
          "prodId": p.prodId,
            "prodName": "",
            "prodPic": "",
            "orderId": 0,
            "count": 0,
            "cost": 0
        }))
      setProdNum(10)
    }
  }, [products])

  useEffect(() => {
    setMyOrders(myOrders);
  }, [prodNum])


  const finish = () => {
    var list=myOrders.filter(e=>e.count!==0);
    dispatch(addOrderThunk({details:list,id:CID}));
  }
  const theme = createTheme({
    typography: {
      fontFamily: [
         '"Segoe UI Symbol"',   ]
    },
  });

  return<div>
    <ThemeProvider theme={theme}>
      <button onClick={e => finish()}>finish and order</button>


      <TableContainer component={Paper} style={{ direction: "rtl", overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>product</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">company</TableCell>
              <TableCell align="right">picture</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell component="th" scope="row">
                  {row.pname}
                </TableCell>
                <TableCell align="right">{row.pdescription}</TableCell>
                <TableCell align="right">{row.pcompany}</TableCell>
               {row.ppicture.length>6&&
                     <Image style={{ backgroundImage: `url(${row.ppicture})`,height:'120px' }} />
                 //   <img src={row.ppicture} alt="" />
               }
                {row.ppicture.length<6&&<TableCell align="right">{row.ppicture}</TableCell>
}
                <TableCell align="right">
                  <button onClick={(e) => add(myOrders[index]?.prodId, 1)}>addToOrder</button>
                  <input type="number" value={myOrders[index]?.Count} onChange={(e) => { add(myOrders[index]?.prodId, e.target.value) }} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </ThemeProvider>
      
  </div>

}


{/* <button>save the order</button> 
  <table style={{ direction: "rtl" }} >
    <thead>
      <tr>
        <td>name</td>
        <td>details</td>
        <td>company</td>
        <td>picture</td>
      </tr></thead>
    <tbody>
      {products.map((p, index) =>
        <tr>
          <td>{p.pname}</td>
          <td>{p.pdescription}</td>
          <td>{p.pcompany}</td>
          <td>{p.ppicture}</td>
          <td>
            <button onClick={(e) => add(p.prodid, index)}>addToOrder</button>
            <input type="number" value={myOrders[index]?.Count} onChange={(e) => { add(myOrders[index].prodId,e.target.value)}} />

          </td>
        </tr>
      )
      }</tbody>
  </table>*/}