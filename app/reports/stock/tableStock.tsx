import React from 'react'

type StockReport = {
    menu_id: number;
    menu_name: string;
    stock: number;
    sold: number;
    type_id: number
}

const TableStock = ({stocks}: {stocks: StockReport[]}) => {
  return (
    <div>
        <table className="table w-full">
                    <thead>
                        <tr className='bg-amber-400 text-white text-sm'>
                            <th className='text-center'>No</th>
                            <th className='text-base'>Nama Menu</th>
                            <th className='text-center'>Stok tersedia</th>
                            <th className='text-center'>Terjual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((item, index) => (
                            <tr key={index} className={index % 2 == 1 ? 'bg-base-200' : ''}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{item.menu_name}</td>
                                <td className='text-center'>{item.stock}</td>
                                <td className='text-center'>{item.sold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    </div>
  )
}

export default TableStock