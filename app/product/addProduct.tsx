'use client'
import axios from 'axios';
import React from 'react'
import { SyntheticEvent, useState } from 'react'
import { BASE_URL } from '../Config/config';
import { useRouter } from 'next/navigation';

type Categories = {
    listCategories: any;
};

type Category = {
    id: number;
    name: string;
  }

const AddProduct = ({listCategories}: Categories) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [tag, setTag] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    
    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
  }
};


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'name': name,
            'category_id': categoryId,
            'stock': stock,
            'price': price,
            'tag': tag,
            'image': image !== null ? image.name : ''
        };
        let response = await axios.post(`${BASE_URL}/product`, data);

        setisMutating(false);
        setName("")
        setImage(null)
        setTag("")
        setPrice(0)
        setStock(0)
        setCategoryId(0)
        setModal(false);
        console.log(response)
        router.refresh();

    }

    return (
        <div>
            <button className="btn btn-neutral btn-sm mb-5" onClick={handleModal}>Tambah Produk</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Tambah Produk</h3>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                <option value="">Silahkan Pilih Kategori</option>
                                {listCategories.map((category: Category) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className="text-sm font-semibold block mb-2">Gambar</label>
                            <input type="file" id='image' onChange={handleFileChange} className='input w-full input-bordered text-sm' />
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