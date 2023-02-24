import { createContext, useState } from "react";


export const PaginationContext = createContext<any>([]);

export const PaginationProvider = ({children}:any)=>{
    const [pagination, setPagination] = useState<number>(1);

    const proximaPagina = () => {
        setPagination((prev: number) => prev + 1);
        console.log(pagination)
    }
    const voltarPagina = () => {
        setPagination((prev: number) => prev - 1);
        console.log(pagination)
    }

    return (
    <PaginationContext.Provider value={{pagination, proximaPagina, voltarPagina}}>{children}</PaginationContext.Provider>
    )
}