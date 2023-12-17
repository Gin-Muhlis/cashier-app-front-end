'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

type Type = {
    id: number;
    type_name: string;
    category: {
        id: number,
        name: string
    }
}

type Category = {
    id: number,
    name: string
}

const UpdateType = ({type, categories}: {type: Type, categories: Category[]}) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [typeName, setTypeName] = useState(type.type_name);
    const [categoryId, setCategoryId] = useState(type.category.id);

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

        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/types/${type.id}`, data);

        setisMutating(false);
        setTypeName(type.type_name)
        setCategoryId(type.category.id)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit Jenis {type.type_name}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Jenis</label>
                            <input type="text" id='nama_kategori' value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder='Nama Jenis' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <select className="select select-bordered w-full" onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                                <option disabled selected>Pilih kategori</option>
                                {categories.map((item, index) => (
                                    <option
                                    value={item.id}
                                    selected={type.category.id === item.id}
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

export default UpdateType;