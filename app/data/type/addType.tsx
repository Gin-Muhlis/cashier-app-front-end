'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

type Category = {
    id: number,
    name: string
}


const AddStock = ({categories}: {categories: Category[]}) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [typeName, setTypeName] = useState("");
    const [categoryId, setCategoryId] = useState(0);


    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'type_name': typeName,
            'category_id': categoryId
        };

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/types`, data);

        setisMutating(false);
        setTypeName("")
        setCategoryId(0)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Jenis</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Data Jenis</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Jenis</label>
                            <input type="text" id='nama_jenis' value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder='Nama Jenis' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Kategori</label>
                            <select className="select select-bordered w-full " onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                                <option disabled selected>Pilih kategori</option>
                                {categories.map((item, index) => (
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
        </div>
    )
}

export default AddStock;