import { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [admin,setAdmin]=useState({name:"manf",token:"1234"})

    return (
        <> 
        <Cart.Provider value={{ category,language,admin,setAdmin,setLanguage,setCategory }}>
            {children}
        </Cart.Provider>
        </>

    );
};

export const CartState = () => {
    return useContext(Cart);
};

export default Context;
