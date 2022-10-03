import { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');

    return (
        <> 
        <Cart.Provider value={{ category,language, setLanguage,setCategory }}>
            {children}
        </Cart.Provider>
        </>

    );
};

export const CartState = () => {
    return useContext(Cart);
};

export default Context;
