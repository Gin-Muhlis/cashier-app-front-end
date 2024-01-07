import axios from 'axios'
import React from 'react'
import AddOrder from './addOrder';
import DeleteOrder from './deleteOrder';
import UpdateOrder from './update.Order';

type Order = {
    id: number;
    order_date: string;
    start: string;
    end: string;
    order_name: string;
    customer_amount: number;
    table: {
        id: number,
        table_number: number
    }
}

type Table = {
    id: number,
    table_number: number
}

const getOrders = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);

    return response.data.data;
}

const getTable = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tables`);

    return response.data.data;
}

const Customer = async () => {
    let orders: Order[] = await getOrders();
    let tables: Table[] = await getTable();

    return (
        <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
            <h1 className='font-bold text-black mb-5 text-2xl'>Order/Pemesanan Meja</h1>
            <AddOrder tables={tables} />
            <div className="rounded-md bg-white p-3 w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Tanggal</th>
                            <th className='text-base'>Mulai</th>
                            <th className='text-base'>Selesai</th>
                            <th className='text-base'>Nama Pemesan</th>
                            <th className='text-base'>Jumlah Pelanggan</th>
                            <th className='text-base'>Nomor Meja</th>
                            <th className='text-center text-base'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.order_date}</td>
                                <td>{order.start}</td>
                                <td>{order.end}</td>
                                <td>{order.order_name}</td>
                                <td>{order.customer_amount}</td>
                                <td>{order.table?.table_number}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <UpdateOrder order={order} tables={tables} />
                                    <DeleteOrder {...order} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer