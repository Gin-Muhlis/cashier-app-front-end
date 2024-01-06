'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

type Role = {
    id: number,
    name: string
  }

const AddUser = ({roles}: {roles: Role[]}) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRoleId] = useState(0);

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
            'address': address,
            'password': password,
            'role_id': role
        };

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, data);

        setisMutating(false);
        setName("")
        setEmail("")
        setPhone("")
        setAddress("")
        setPassword("")
        setRoleId(0)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah User</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah User</h3>
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
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Passowrd</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Role</label>
                            <select className="select select-bordered w-full " defaultValue={0} onChange={(e) => setRoleId(parseInt(e.target.value))}>
                                <option disabled value={0}>Pilih Role</option>
                                {roles.map((item, index) => (
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

export default AddUser;