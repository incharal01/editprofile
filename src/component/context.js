import { useContext,createContext, useState } from "react";

export const Userprofile = createContext();

export const UserProvider = ({Edit}) =>{
    const [data, setData] = useState({
        name:'',
        username:'',
        email:'',
        phone:''
    })



    return(
        <Userprofile.Provider value={{data,setData}}>
            <Edit/>
        </Userprofile.Provider>
    )
}