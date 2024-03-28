// DataContext.js
import React, { createContext, useState } from 'react';


const DataContext = createContext();


export const DataProvider = ({ children }) => {
const [data, setData] = useState({}); // Initial data state


return (
<DataContext.Provider value={{ data, setData }}>
{children}
</DataContext.Provider>
);
};


export default DataContext;

