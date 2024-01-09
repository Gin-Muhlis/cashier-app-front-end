'use client'
import React from 'react'

type StockReport = {
    menu_id: number;
    menu_name: string;
    stock: number;
    sold: number;
    type_id: number
}

type Type = {
    id: number;
    type_name: string;
}

const FilterType = ({ types, setReportStock, reportStock }: { types: Type[], setReportStock: React.Dispatch<React.SetStateAction<StockReport[]>>, reportStock: StockReport[] }) => {

    const handleChange = (e: any) => {
        let value = e.target.value
        if (value == 0) {

            setReportStock(reportStock)
        } else {
            let newReports = reportStock.filter(item => item.type_id == e.target.value)

            setReportStock(newReports)
        }
        

    }

    return (
        <div className="basis-1/2">
            <label htmlFor="filterType" className='label font-semibold'>Pilih jenis menu</label>
            <select className="select select-warning select-sm w-full" id='filterType' defaultValue={0} onChange={handleChange}>
                <option value={0}>Semua Jenis</option>
                {types.map((type, index) => (
                    <option key={index} value={type.id}>{type.type_name}</option>
                ))},
            </select>
        </div>
    )
}

export default FilterType