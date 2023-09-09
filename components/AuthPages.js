import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { store } from "@/redux/store";



const AuthPages = ({children}) => {

    
    const token = useSelector(state => state?.authPersistReducer?.user?.auth?.token)

    console.log(token);
    
    return ( <>
    {token ? [children] : (<LoginForm/>)}
    
    </> );
}
 
export default AuthPages;