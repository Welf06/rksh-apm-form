import { createContext, useState } from "react";

export const formData = createContext({});

function Context({ children }) {
   const [message, setMessage] = useState();
 
   return (
     <formData.Provider value={{ message, setMessage }}>
       {children}
     </formData.Provider>
   );
 }

export default Context;