'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweatAlert';

type Category = {
    id: number;
    name: string;
}

const UpdateCategory = (params: Category) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [namaKategori, setNamaKategori] = useState(params.name);
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
            'name': namaKategori
        };

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}`, data);

            setisMutating(false);
            setNamaKategori(res.data.data?.name)
            setModal(false);
            setStatus(res.status)
            setMessage(res.data.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false)
            setStatus(500)
            setMessage('Kategori gagal diupdate')
            router.refresh();
        }

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
            {status && <SweetAlert status={status} message={message} onClose={() => setStatus(null)} />}
        </div>
    )
}

export default UpdateCategory;