import { createContext, useContext } from "react";

interface AuthContextType{
    // null because maybe the user is not login yet so it will be null
    username : string | null,
    token : string | null,
    login : (username : string , token : string) => void,
    logout : () => void,
    isAuth : boolean
}

export const AuthContext = createContext <AuthContextType>({
    username : null,
    token : null,
    login : () => {},
    logout : () => {},
    isAuth : false
});

export const useAuth = () => useContext(AuthContext);