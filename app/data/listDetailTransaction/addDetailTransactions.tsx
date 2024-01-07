'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Transaction = {
    id: number;
    total_payment: number
}

type Menu = {
    id: number;
    name: string
}

const AddDetailTransaction = ({ transactions, menus }: { transactions: Transaction[], menus: Menu[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [subTotal, setSubTotal] = useState(0)
    const [unitPrice, setUnitPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [menuId, setMenuId] = useState(0)
    const [transactionId, setTransactionId] = useState(0)
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubTotal = (e: any) => {
        setQuantity(e.target.value)
        setUnitPrice(e.target.value)
        setSubTotal(quantity * unitPrice)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'sub_total': subTotal,
            'unit_price': unitPrice,
            'quantity': quantity,
            'menu_id': menuId,
            'transaction_id': transactionId
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transaction-details/`, data);

            setisMutating(false);
            setModal(false);
            setStatus(res.status)
            setMessage(res.data.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false)
            setStatus(error.response.status)
            setMessage('Transaksi detail gagal ditambahkan')
            console.log(error   )

            router.refresh();
        }

    }

    return (
        <div>
             <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Detail Transaksi</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Detail Transaksi</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Sub Total</label>
                            <input type="number"  value={subTotal}  className='input w-full input-bordered text-sm pointer-events-none' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Harga Satuan Menu</label>
                            <input type="number" value={unitPrice} onChange={handleSubTotal} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jumlah</label>
                            <input type="number" value={quantity} onChange={handleSubTotal} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Menu</label>
                            <select className="select select-bordered w-full" defaultValue={menuId} onChange={(e) => setMenuId(parseInt(e.target.value))}>
                                <option value={0}>Pilih Menu</option>
                                {menus.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">User Kasir</label>
                            <select className="select select-bordered w-full" defaultValue={transactionId} onChange={(e) => setTransactionId(parseInt(e.target.value))}>
                                <option value={0}>Pilih Kasir yang menangani</option>
                                {transactions.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.total_payment}</option>
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

export default AddDetailTransaction;