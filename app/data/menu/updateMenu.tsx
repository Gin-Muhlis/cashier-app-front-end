'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation';


type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    type: {
        id: number,
        name: string
    }
    stock: {
        id: number,
        amount: number,
    }
}

type Type = {
    id: number,
    type_name: string
}



const UpdateMenu = ({ types, menu }: { types: Type[], menu: Menu }) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [name, setName] = useState(menu.name);
    const [price, setPrice] = useState(menu.price);
    const [image, setImage] = useState(null as File | null);
    const [description, setDescription] = useState(menu.description);
    const [typeId, setTypeId] = useState(menu.type.id);

    const router = useRouter();
 
    const handleModal = () => {
        setModal(!modal)
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value: any = e.target;
        if (value) {
            setImage(value.files[0])
        }
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        const formData = new FormData();
        formData.append('_method', 'PUT')
        formData.append('menu_name', name);
        formData.append('price', price.toString());
        formData.append('description', description);
        formData.append('type_id', typeId.toString());
        if (image) {
            formData.append('image', image);
        }
        
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menus/${menu.id}`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        const menuUpdated = res.data.data

        setisMutating(false);
        setName(menuUpdated.name)
        setPrice(menuUpdated.price)
        setImage(null as File | null)
        setDescription(menuUpdated.description)
        setTypeId(menuUpdated.type.id)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
           <button className="btn btn-primary btn-xs" onClick={handleModal}>Edit</button>
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
                            <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} placeholder='Nama Menu' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Gambar</label>
                            <input type="file" name="image" onChange={handleChangeImage} className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Tipe Menu</label>
                            <select className="select select-bordered w-full" defaultValue={menu.type.id} onChange={(e) => setTypeId(parseInt(e.target.value))}>
                                <option value={0}>Pilih Tipe Menu</option>
                                {types.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.type_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="text-sm font-semibold block mb-2">Deskripsi</label>
                            <textarea className='input w-full input-bordered text-sm' onChange={(e) => setDescription(e.target.value)} defaultValue={menu.description}></textarea>
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

export default UpdateMenu;
