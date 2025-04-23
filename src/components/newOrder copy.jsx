import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProductsThunk } from "../redux/slices/getProductsThunk";
import './newOrder.css'
import { addToOrder } from "../redux/slices/productsSlice";
import { addOrderThunk } from "../redux/slices/addOrderThunk";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
export const NewOrder = () => {


  const products = useSelector(state => state.Products.productsList);
  const dispatch = useDispatch();
  const [prodNum, setProdNum] = useState(0);
  const [myorders, setMyOrders] = useState([]);

  const add = (i, num) => {
    myorders[i].Count +=parseInt(num) ;
    console.log(i + "i");
    console.log(num + "num");
    console.log(myorders);
    console.log("myorders[i].Count");
    console.log(myorders[i].Count);
    setMyOrders(myorders);
    // console.log(i + "i");
    // console.log(num + "num");
    // // console.log(...myorders,myorders[i].Count+=num);
    // var a = parseInt(myorders[i].Count) + num;
    // //setMyOrders(a)
    // myorders[i].Count = a;
    // setMyOrders(myorders);
    // console.log("myorders[i].Count");
    // console.log(myorders[i].Count);


  }

  
  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])
  useEffect(() => {
    if (products.length > 0) {
      products?.map(p => myorders.push(
        {
          "prodId": p.prodId,
          "Count": 0
        }))
      setProdNum(10)
    }
  }, [products])

  useEffect(() => {
    setMyOrders(myorders);
  }, [prodNum])


  // const finish=()=>{
  // dispatch(addOrderThunk(myorders))
  // }


  return <div>
    <button >finish and order</button>
    {/* onClick={e=>finish()} */}
    <button>save the order</button>
    {/* <table style={{ direction: "rtl" }} >
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
              <input type="number" value={myorders[index]?.Count} onChange={(e)=>{myorders[index].Count=e.target.value;setMyOrders(myorders);setProdNum(5)}} />

            </td>
          </tr>
        )
        }</tbody>
    </table> */}
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 

  </div>
}