'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';


type Type = {
    id: number,
    type_name: string
}



const AddMenu = ({ types }: { types: Type[] }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null as File | null);
    const [description, setDescription] = useState("");
    const [typeId, setTypeId] = useState("");
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value: any = e.target;
        if (value.files) {
            setImage(value.files[0])
        }
        console.log(e.target)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        const formData = new FormData();
        formData.append('menu_name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('type_id', typeId);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menus`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            console.log(res)
    
            setisMutating(false);
            setName("")
            setPrice("")
            setImage(null as File | null)
            setDescription("")
            setTypeId("")
            setModal(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh();
        } catch (error: any) {
            setisMutating(false);
            setStatus(error.response.status);
            setMessage('Menu gagal ditambahkan')
            router.refresh();
        }
    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Menu</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Data Menu</h3>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Nama Menu</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama Menu' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Harga</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Nama Menu' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Gambar</label>
                            <input type="file" name="image" onChange={handleChangeImage} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Tipe Menu</label>
                            <select className="select select-bordered w-full " onChange={(e) => setTypeId(e.target.value)}>
                                <option>Pilih Type</option>
                                {types.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.type_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Deskripsi</label>
                            <textarea className='input w-full input-bordered text-sm' onChange={(e) => setDescription(e.target.value)}></textarea>
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

export default AddMenu;