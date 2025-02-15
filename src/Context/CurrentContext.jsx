import { createContext, useState } from "react";

 export let CurrentContext = createContext();
export default function CurrentContextProvider(props){
    const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken")?localStorage.getItem("userToken"):null)
    return(<>
    <CurrentContext.Provider value={{userLogin, setuserLogin}}>
        {props.children}
    </CurrentContext.Provider>
    </>)
}