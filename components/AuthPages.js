import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";



const AuthPages = ({children}) => {

    
    const token = useSelector(state => state?.authPersistReducer?.user?.auth?.token)
    
    return ( <>
    {token ? [children] : (<LoginForm/>)}
    
    </> );
}
 
export default AuthPages;