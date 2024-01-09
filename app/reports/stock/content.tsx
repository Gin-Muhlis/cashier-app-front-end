'use client'

import React, { useState } from 'react'
import FilterType from './filterType'
import TableStock from './tableStock';

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


const Content = ({ types, dataStock, stockAmount }: { types: Type[], dataStock: StockReport[], stockAmount: number }) => {
    const [reportStock, setReportStocks] = useState<StockReport[]>(dataStock)
    return (
        <div className='p-10 bg-gray-200 w-full min-h-screen'>
            <h1 className='font-bold text-black mb-5 text-2xl'>Laporan Stok</h1>
            <div className="rounded-md bg-white p-5">
                <div className="mb-5 text-md text-black font-semibold flex align-items-center gap-3">
                    <span className="italic">Total Stok :</span>
                    <span>{stockAmount}</span>
                </div>
                <div className="mb-10 flex flex-wrap gap-4 items-center justify-start w-full">
                    <FilterType types={types} setReportStock={setReportStocks} reportStock={dataStock} />
                </div>
                <TableStock stocks={reportStock} />
            </div>
        </div>
    )
}

export default Content