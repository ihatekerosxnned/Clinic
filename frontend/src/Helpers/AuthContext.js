import { createContext } from "react";

export const AuthContext = createContext({
    username: "",
    id: 0,
    firstName: "",
    lastName:"",
    status: false
});