'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

const AddTable = () => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [noTable, setNoTable] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [tableStatus, setTableStatus] = useState("available");
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
            'table_number': noTable,
            'capacity': capacity,
            'status': tableStatus,
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tables`, data);

            setisMutating(false);
            setNoTable(0)
            setCapacity(0)
            setTableStatus("available")
            setModal(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false);
            setStatus(error.status);
            setMessage('Meja gagal ditambahkan')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Meja</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Meja</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">No Meja</label>
                            <input type="number" value={noTable} onChange={(e) => setNoTable(parseInt(e.target.value))} placeholder='No Meja' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Kapasitas</label>
                            <input type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} placeholder='Kapasitas' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Status</label>
                            <select className="select select-bordered w-full " value={tableStatus} defaultValue={0} onChange={(e) => setTableStatus(e.target.value)}>
                                <option disabled value={0}>Pilih Status</option>
                                <option value="available">Tersedia</option>
                                <option value="reserved">Dipesan</option>
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

export default AddTable;