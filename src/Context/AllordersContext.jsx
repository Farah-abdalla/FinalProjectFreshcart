import { createContext } from "react";

  export let AllordersContext = createContext()

  export default function AllordersContextProvider(props){
  

    function getALLproduct(){
        return axios
    }

    return(<>
    <AllordersContext.Provider value={{}}>
        {props.children}
    </AllordersContext.Provider>
    </>)
  }