'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Table = {
    id: number,
    table_number: number
}

const AddOrder = ({ tables }: { tables: Table[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [orderDate, setOrderDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [orderName, setOrderName] = useState("");
    const [customerAmount, setCustomerAmount] = useState(0);
    const [tableId, setTableId] = useState(0);
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'order_date': orderDate,
            'start': start,
            'end': end,
            'order_name': orderName,
            'customer_amount': customerAmount,
            'table_id': tableId
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data);
   
            setisMutating(false);
            setOrderDate("")
            setStart("")
            setEnd("")
            setOrderName("")
            setCustomerAmount(0)
            setTableId(0)
            setModal(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh();
        } catch (error: any) {
            console.log(error)
            setisMutating(false);
            setStatus(error.response.status);
            setMessage('Pemesanan gagal ditambahkan')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Order</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Order</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Tanggal Pesan</label>
                            <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)}  className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jam Mulai</label>
                            <input type="time" step="1" value={start} onChange={(e) => setStart(e.target.value)}  className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jam Selesai</label>
                            <input type="time" step="1" value={end} onChange={(e) => setEnd(e.target.value)} placeholder='No Telp' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Pemesan</label>
                            <input type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder='Nama Pemesan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jumlah Pelanggan</label>
                            <input type="number" value={customerAmount} onChange={(e) => setCustomerAmount(parseInt(e.target.value))} placeholder='Jumlah Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Role</label>
                            <select className="select select-bordered w-full " value={tableId} onChange={(e) => setTableId(parseInt(e.target.value))}>
                                <option disabled value={0}>Pilih Nomor Meja</option>
                                {tables.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.table_number}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Batal</button>

                            {isMutataing ? (
                                <button type='button' className="btn btn-primary btn-sm">Menyimpan...</button>
                            ) : (
                                <button type='submit' onClick={handleModal} className="btn btn-primary btn-sm">Simpan</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {status && <SweetAlert status={status} message={message} onClose={() => setStatus(null)} />}
        </div>
    )
}

export default AddOrder;