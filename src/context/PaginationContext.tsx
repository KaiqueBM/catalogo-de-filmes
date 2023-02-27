import { createContext, useState } from "react";


export const PaginationContext = createContext<any>([]);

export const PaginationProvider = ({children}:any)=>{
    const [pagination, setPagination] = useState<number>(1);

    const proximaPagina = () => {
        setPagination((prev: number) => prev + 1);
    }
    const voltarPagina = () => {
        setPagination((prev: number) => prev - 1);
    }

    const primeiraPagina = () => {
        setPagination(1)
    }

    return (
    <PaginationContext.Provider value={{pagination, proximaPagina, voltarPagina, primeiraPagina}}>{children}</PaginationContext.Provider>
    )
}