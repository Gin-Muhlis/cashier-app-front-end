'use client'
import axios from 'axios';
import React from 'react'
import { SyntheticEvent, useState } from 'react'
import { BASE_URL } from '../Config/config';
import { useRouter } from 'next/navigation';

type Category = {
    id: number;
    name: string;
  }

const UpdateCategory = (params: Category) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [namaKategori, setNamaKategori] = useState(params.name);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'name': namaKategori
        };

        await axios.patch(`${BASE_URL}/category/${params.id}`, data);

        setisMutating(false);
        setNamaKategori("")
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit Kategori {params.name}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Kategori</label>
                            <input type="text" id='nama_kategori' value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} placeholder='Nama kategori' className='input w-full input-bordered text-sm' />
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

export default UpdateCategory;