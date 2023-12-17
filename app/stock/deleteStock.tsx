'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

type Stock = {
    id: number;
    amount: number;
    menu: {
      id: number,
      name: string
    }
  }
  
const DeleteStock = (params: Stock) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/stocks/${params.id}`);

        setisMutating(false);
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-error btn-xs" onClick={handleModal}>Hapus</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Hapus Stok Menu {params.menu.name}?</h3>
                    <p className='mb-5 text-red-600'>Data yang dihapus tidak dapat dikembalikan!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-action">
                            <button type='button' onClick={handleModal} className="btn btn-sm">Batal</button>

                            {isMutataing ? (
                                <button type='button' className="btn btn-primary btn-sm">Menghapus...</button>
                            ) : (
                                <button type='submit' onClick={handleModal} className="btn btn-primary btn-sm">Hapus</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteStock;