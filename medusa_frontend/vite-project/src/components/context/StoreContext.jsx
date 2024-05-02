import { createContext, useState } from "react";

//create new context
export const StoreContext = createContext()

//provider to wrap app
export const StoreContextProvider = ({children}) => {

    //state to track cart
const [cart, setCart] = useState();

    return(
        <StoreContext.Provider value ={{cart, setCart}}>
            {children}
        </StoreContext.Provider>
    )
}