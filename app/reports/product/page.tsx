import axios from 'axios';
import React from 'react'

type Sold = {
    transaction_id: number;
    date_tranasction: string;
    sold: number;
}

type ReportProduct = {
    id: number;
    product_name: string;
    supplier_name: string;
    sell_price: number;
    solds: Sold[]
}

const getReportProducts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/report/entrusted-products`);

        return response.data.data
    } catch (error: any) {
        return error.response
    }
}

const ReportProduct = async (id: number) => {
    const reportProducts: ReportProduct[] = await getReportProducts()

    const handleSoldValue = (id: number) => {
        const product = reportProducts.find((data => data.id == id));

        let total = 0;
        if (Number(product?.solds.length) > 0) {
            product?.solds.map((item) => {
                total += item.sold;
            })
        }

        return total;
    }

    return (
        <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
            <h1 className='font-bold text-black mb-5 text-2xl'>Laporan Produk Titipan</h1>
            <div className="rounded-md bg-white p-5 w-full">
                <h1 className="text-center text-black text-lg mb-2 font-bold">Filter Berdasarkan Tanggal</h1>
                <div className="w-full flex flex-wrap items-center justify-center gap-5 mb-8">
                    <div className="flex items-center justify-start gap-3">
                        <span className="text-md text-black">Dari Tanggal</span>
                        <input type="date" className='border border-solid rounded p-1' />
                    </div>
                    <div className="flex items-center justify-start gap-3">
                        <span className="text-md text-black">Sampai Tanggal</span>
                        <input type="date" className='border border-solid rounded p-1' />
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Nama Produk</th>
                            <th className='text-base'>Nama Supplier</th>
                            <th className='text-base'>Terjual</th>
                            <th className='text-base'>harga</th>
                            <th className='text-base'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportProducts.map((report, index) => (
                            <tr key={report.id}>
                                <td>{index + 1}</td>
                                <td>{report.product_name}</td>
                                <td>{report.supplier_name}</td>
                                <td>{handleSoldValue(report.id)}</td>
                                <td>{report.sell_price}</td>
                                <td>{handleSoldValue(report.id) * report.sell_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportProduct