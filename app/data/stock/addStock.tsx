'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Menu = {
    id: number,
    name: string
}

const AddType = ({ menus }: { menus: Menu[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [amount, setAmount] = useState(0);
    const [menuId, setMenuId] = useState(0);
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
            'amount': amount,
            'menu_id': menuId
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stocks`, data);

            setisMutating(false);
            setAmount(0)
            setMenuId(0)
            setModal(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh();
        } catch (error) {
            setisMutating(false);
            setStatus(500);
            setMessage('Stok gagal ditambahkan')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Stok</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Data Stok</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Jumlah Stok</label>
                            <input type="number" id='nama_jenis' value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} placeholder='Nama Jenis' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Menu</label>
                            <select className="select select-bordered w-full" value={menuId} defaultValue={menuId} onChange={(e) => setMenuId(parseInt(e.target.value))}>
                                <option disabled value={0}>Pilih Menu</option>
                                {menus.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.name}</option>
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

export default AddType;