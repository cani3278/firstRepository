import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
export const Home=()=>{
    const CName = useSelector(state => state.user.custDetails.custName);
const navigate=useNavigate();
const newOrd=()=>{
    navigate('/newOrder')
 }
 const Ord=()=>{
    navigate('/Orders')
 }



    return <div>
       
        Home Page😉{CName}

        <button onClick={newOrd}>new order</button>
        <button onClick={Ord}>my old orders</button>
    
    </div>
}