import React, {useEffect, useState, createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const verifySession = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/users', { withCredentials: true });
                if(response.data.valid){
                    setIsAuthenticated(true);
                
                  
                }else{
                    setIsAuthenticated(false)
                }
            }catch{
                setIsAuthenticated(false)

            }
        }
        verifySession();

    },[])

    const logout = async ()=>{
        try{
            const response = await axios.post('http://localhost:5000/logout', {withCredentials : true});
            if(response.status === 200){
                setIsAuthenticated(false);
                localStorage.clear();
                navigate('/')
            }
        }catch(err){
            console.log('Logout Failed', err)
        }
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>

    );
}