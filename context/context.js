import { createContext, useState } from "react";

export const formContext = createContext({});

function Context({ children }) {
   const [formData, setFormData] = useState();
 
   return (
     <formContext.Provider value={{ formData, setFormData }}>
       {children}
     </formContext.Provider>
   );
 }

export default Context;