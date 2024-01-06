'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: {
        id: number,
        name: string
    }
}

type Role = {
    id: number,
    name: string
}

const UpdateUser = ({ user, roles }: { user: User, roles: Role[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(user.role.id)

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
            'password': password.length < 1 ? null : password,
            'role_id': roleId
        };

        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, data);

        setisMutating(false);
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
        setPassword("")
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama User</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Email User</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">No Telp User</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='No Telp Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Alamat User</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Alamat Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Alamat Pelanggan' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Role</label>
                            <select className="select select-bordered w-full " defaultValue={roleId} onChange={(e) => setRoleId(parseInt(e.target.value))}>
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

export default UpdateUser;