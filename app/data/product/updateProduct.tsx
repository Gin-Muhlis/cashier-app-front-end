'use client'
import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type EntrustedProduct = {
    id: number;
    product_name: string;
    supplier_name: string;
    purchase_price: number;
    sell_price: number;
    stock: number;
    description: string;
}

const UpdateProduct = (params: EntrustedProduct) => {
    const [modal, setModal] = useState(false);
    const [isMutataing, setisMutating] = useState(false);
    const [product, setProduct] = useState(params.product_name);
    const [supplier, setSupplier] = useState(params.supplier_name);
    const [purchasePrice, setPurchasePrice] = useState(params.purchase_price);
    const [sellPrice, setSellPrice] = useState(params.sell_price);
    const [stock, setStock] = useState(params.stock);
    const [description, setDescription] = useState(params.description);
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter();

    const handleModal = () => {
        setModal(!modal)
    }

    const handleChangePurchasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        const numericValue = Number(value.replace(/\D/g, ''));

        const interest = 0.7;
        const minimumIncrement = 500;
        let calculatedPrice = numericValue * (1 + interest);
        calculatedPrice = Math.round(calculatedPrice / minimumIncrement) * minimumIncrement;

        setPurchasePrice(Number(numericValue))
        setSellPrice(calculatedPrice)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setisMutating(true);

        let data = {
            'product_name': product,
            'supplier_name': supplier,
            'purchase_price': purchasePrice,
            'sell_price': sellPrice,
            'stock': stock,
            'description': description,
        };

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/entrusted-products/${params.id}`, data);


            setisMutating(false);
            setProduct("");
            setSupplier("");
            setPurchasePrice(0);
            setSellPrice(0);
            setStock(0);
            setDescription("");
            setStatus(false)
            setMessage(false)

            setStatus(res.status);
            setMessage(res.data?.message)
        } catch (error: any) {
            setisMutating(false);
            setStatus(error.response.status);
            setMessage('Kategori gagal ditambahkan')
        }

    }

    const resetState = () => {
        setModal(false);
        setStatus(false)
        location.reload()
    }

    return (
        <div>
            <button className="btn btn-primary capitalize btn-xs" onClick={handleModal}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleModal} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Edit Produk Titipan</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="nama_produk" className="text-sm font-semibold block mb-2">Nama Produk</label>
                            <input type="text" id='nama_produk' value={product} onChange={(e) => setProduct(e.target.value)} placeholder='Nama Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="nama_supplier" className="text-sm font-semibold block mb-2">Nama Supplier</label>
                            <input type="text" id='nama_supplier' value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder='Nama Supplier' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="harga_beli" className="text-sm font-semibold block mb-2">Harga Beli</label>
                            <input type="text" min={1} id='harga_beli' value={purchasePrice} onChange={handleChangePurchasePrice} placeholder='Harga Beku' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="harga_jual" className="text-sm font-semibold block mb-2">Harga Jual</label>
                            <input type="text" min={1} id='harga_jual' value={sellPrice} readOnly placeholder='Harga Jual' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="stok" className="text-sm font-semibold block mb-2">Stok Produk</label>
                            <input type="number" min={1} id='stok' value={stock} onChange={(e) => setStock(Number(e.target.value))} placeholder='Stok Produk' className='input w-full input-bordered text-sm' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="deskripsi" className="text-sm font-semibold block mb-2">Deskripsi produk</label>

                            <textarea id="deskripsi" cols={30} rows={10} value={description} onChange={(e) => setDescription(e.target.value)} className='input p-2 w-full input-bordered text-sm'></textarea>
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
            {status && <SweetAlert status={status} message={message} resetState={resetState} />}
        </div>
    )
}

export default UpdateProduct;