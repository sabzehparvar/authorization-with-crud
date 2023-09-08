import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";




const AuthPages = ({children}) => {

    const token = useSelector(state => state?.user?.auth?.token)
    // console.log(token);
    
    return ( <>
    {token ? [children] : (<LoginForm/>)}
    
    </> );
}
 
export default AuthPages;