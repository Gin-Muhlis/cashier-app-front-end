import axios from 'axios';
import React, { useState } from 'react'
import Content from './content';

type Type = {
    id: number;
    type_name: string;
}

type StockReport = {
    menu_id: number;
    menu_name: string;
    stock: number;
    sold: number;
    type_id: number
}

const getTypes = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/types`);

    return response.data.data;
}

const getStockReports = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stock-report`)

    return response.data
}

const StockReport = async () => {
    let types: Type[] = await getTypes();
    let dataStock = await getStockReports();
    
    let stockAmount = dataStock.stock_amount
    let stocks: StockReport[] = dataStock.data

    return (
        <Content types={types} dataStock={stocks} stockAmount={stockAmount} />
    )
}

export default StockReport