'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';


type Table = {
    id: number;
    table_number: number;
    capacity: number;
    status: string;
}

const UpdateTable = (params: Table) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [noTable, setNoTable] = useState(params.table_number);
    const [capacity, setCapacity] = useState(params.capacity);
    const [status, setStatus] = useState(params.status);

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
            'status': status,
        };

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tables/${params.id}`, data);

        setisMutating(false);
        setNoTable(params.table_number)
        setCapacity(params.capacity)
        setStatus(params.status)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Meja</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Kategori</label>
                            <input type="number" value={noTable} onChange={(e) => setNoTable(parseInt(e.target.value))} placeholder='No Meja' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Kapasitas</label>
                            <input type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} placeholder='No Meja' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Status</label>
                            <select className="select select-bordered w-full " onChange={(e) => setStatus(e.target.value)}>
                                <option disabled selected>Pilih Status</option>
                                <option value="available" selected={params.status == 'available'}>Tersedia</option>
                                <option value="reserved" selected={params.status == 'reserved'}>Dipesan</option>
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
        </div>
    )
}

export default UpdateTable;