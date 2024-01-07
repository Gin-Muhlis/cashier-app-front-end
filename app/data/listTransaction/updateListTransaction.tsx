'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Transaction = {
    id: number;
    date: string;
    total_payment: number;
    description: string;
    payment: {
        id: number;
        name: string
    };
    user: {
        id: number;
        name: string
    }
}

type Payment = {
    id: number;
    name: string
}

type User = {
    id: number;
    name: string
}


const UpdateTransaction = ({ transaction, payments, users }: { transaction: Transaction, payments: Payment[], users: User[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [date, setDate] = useState(transaction.date)
    const [totalPayment, setTotalPayment] = useState(transaction.total_payment)
    const [description, setDescription] = useState(transaction.description)
    const [paymentId, setPaymentId] = useState(transaction.payment.id)
    const [userId, setUserId] = useState(transaction.user.id)
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'date': date,
            'total_payment': totalPayment,
            'description': description,
            'payment_method_id': paymentId,
            'user_id': userId
        };

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`, data);

            setisMutating(false);
            setModal(false);
            setStatus(res.status)
            setMessage(res.data.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false)
            setStatus(error.response.status)
            setMessage('Transaksi gagal diupdate')
            console.log(error   )

            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit Transaksi</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Tanggal</label>
                            <input type="date" id='nama_kategori' value={date} onChange={(e) => setDate(e.target.value)} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Total Pembayaran</label>
                            <input type="number" id='nama_kategori' value={totalPayment} onChange={(e) => setTotalPayment(parseInt(e.target.value))} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jenis Pembayaran</label>
                            <select className="select select-bordered w-full" value={transaction.payment.id} onChange={(e) => setPaymentId(parseInt(e.target.value))}>
                                <option value={0}>Pilih Jenis Pembayaran</option>
                                {payments.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">User Kasir</label>
                            <select className="select select-bordered w-full" value={transaction.user.id} onChange={(e) => setUserId(parseInt(e.target.value))}>
                                <option value={0}>Pilih Kasir yang menangani</option>
                                {users.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">descripksi</label>
                            <textarea className='input w-full h-28 rounded p-2 text-sm border border-solid border-amber-200' defaultValue={transaction.description} onChange={(e) => setDescription(e.target.value)}></textarea>
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

export default UpdateTransaction;