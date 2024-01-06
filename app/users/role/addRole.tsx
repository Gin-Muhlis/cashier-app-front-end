'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';


const AddRole = () => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [role, setRole] = useState("");
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
            'name': role
        };

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/roles`, data);

            setisMutating(false);
            setRole("");
            setModal(false);
            
            setStatus(res.status);
            setMessage(res.data?.message)
              
            router.refresh();
        } catch (error) {
            setisMutating(false);
            setStatus(500);
            setMessage('Role gagal ditambahkan')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Role</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Role</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Role</label>
                            <input type="text" id='nama_kategori' value={role} onChange={(e) => setRole(e.target.value)} placeholder='Nama kategori' className='input w-full input-bordered text-sm' />
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

export default AddRole;