import { useState } from "react"
import {authService} from "../services/auth.service"

export const useAuth = ()=>{
    const [token , setToken] = useState(localStorage.getItem('token'));

    const login = async(email , password)=>{
        const fetchToken = await authService.login(email,password);
        if(fetchToken){
            localStorage.setItem('token',fetchToken);
            setToken(fetchToken);
        }
        return fetchToken
    };
    const logout = async()=>{
        localStorage.removeItem('token');
        setToken(null);
        window.location.href='/login';
    }
    const isAuthenticated = !!token;
    return{
        token,
        isAuthenticated,login,logout
    }
}