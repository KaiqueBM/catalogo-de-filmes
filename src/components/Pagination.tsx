import React, { useState } from 'react'



export function proximaPagina(page: number) {
    const [pagination1, setPagination1] = useState<number>(page);
    console.log(pagination1)
  }

export function voltarPagina(page: number) {
    const [pagination, setPagination] = useState<number>(page);
    setPagination((prev: number) => prev - 1);
    console.log("teste")
    return pagination
  }
export function primeiraPagina(number: number) {
    const [pagination, setPagination] = useState<number>(number);
    setPagination(number);
  }
