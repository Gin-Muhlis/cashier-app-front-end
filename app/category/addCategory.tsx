'use client'
import axios from 'axios';
import React from 'react'
import { SyntheticEvent, useState } from 'react'
import { BASE_URL } from '../Config/config';
import { useRouter } from 'next/navigation';

const AddCategory = () => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [namaKategori, setNamaKategori] = useState("");

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

        let response = await axios.post(`${BASE_URL}/category`, data);

        setisMutating(false);
        setNamaKategori("")
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Kategori</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Kategori</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-xs font-semibold uppercase block mb-2">Nama Kategori</label>
                            <input type="text" id='nama_kategori' value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} placeholder='Nama kategori' className='input w-full input-bordered' />
                        </div>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn">Batal</button>

                            {isMutataing ? (
                                <button type='button' className="btn">Menyimpan...</button>
                            ) : (
                                <button type='submit' onClick={handleModal} className="btn">Simpan</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;