'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const UpdateCustomer = (params: Customer) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [name, setName] = useState(params.name);
    const [email, setEmail] = useState(params.email);
    const [phone, setPhone] = useState(params.phone);
    const [address, setAddress] = useState(params.address);
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
            'name': name,
            'email': email,
            'phone': phone,
            'address': address
        };

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/customers/${params.id}`, data);

            setisMutating(false);
            setName(params.name)
            setEmail(params.email)
            setPhone(params.phone)
            setAddress(params.address)
            setModal(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false);
            setStatus(error.status);
            setMessage('Pelanggan gagal diupdate')
            router.refresh();
        }

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit Pelanggan</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">No Telp</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='No Telp' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Alamat</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Alamat' className='input w-full input-bordered text-sm' />
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

export default UpdateCustomer;