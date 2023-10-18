'use client'
import axios from 'axios';
import React from 'react'
import { SyntheticEvent, useState } from 'react'
import { BASE_URL } from '../Config/config';
import { useRouter } from 'next/navigation';

type Categories = {
  id: number;
  name: string;
};

interface AddProductProps {
    listCategories: Categories[]; // Pastikan tipe data yang sesuai digunakan di sini
  }

const AddProduct = (listCategories: AddProductProps) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [tag, setTag] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    console.log(listCategories)
    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'name': name,
            'categori_id': categoryId,
            'stock': stock,
            'price': price,
            'tag': tag,
            'image': image
        };

        await axios.post(`${BASE_URL}/product`, data);

        setisMutating(false);
        setName("")
        setImage("")
        setTag("")
        setPrice(0)
        setStock(0)
        setCategoryId(0)
        setModal(false);

        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Produk</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Produk</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-sm font-semibold block mb-2">Nama Produk</label>
                            <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stok" className="text-sm font-semibold block mb-2">Stok</label>
                            <input type="number" id='stok' value={stock} onChange={(e) => setStock(Number(e.target.value))} placeholder='Stok Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" className="text-sm font-semibold block mb-2">Harga</label>
                            <input type="text" id='price' value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder='Harga Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag" className="text-sm font-semibold block mb-2">Tag</label>
                            <input type="text" id='tag' value={tag} onChange={(e) => setTag(e.target.value)} placeholder='Tag Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="kategori" className="text-sm font-semibold block mb-2">Kategori</label>
                            <select id="kategori" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className='input w-full input-bordered'>
                            </select>
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className="text-sm font-semibold block mb-2">Gambar</label>
                            <input type="file" id='image' value={image} onChange={(e) => setImage(e.target.value)} className='input w-full input-bordered text-sm' />
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

export default AddProduct;