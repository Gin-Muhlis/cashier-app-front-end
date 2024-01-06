'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Menu = {
    id: number;
    name: string;
  }
  
const DeleteMenu = (params: Menu) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/menus/${params.id}`);

        setisMutating(false);
        setModal(false);

        setStatus(res.status);
            setMessage(res.data?.message)

        router.refresh();
        } catch (error: any) {
            setisMutating(false);
            setStatus(error.status);
            setMessage('Menu gagal dihapus')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-error btn-xs" onClick={handleModal}>Hapus</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Hapus Menu {params.name}?</h3>
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
            {status && <SweetAlert status={status} message={message} onClose={() => setStatus(null)} />}
        </div>
    )
}

export default DeleteMenu;