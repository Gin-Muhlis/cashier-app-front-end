'use client'

import React, { useEffect, useState } from 'react'
import Types from './type'
import Menus from './menu'
import SelectedMenu from './selectedMenu'
import PaymentMethods from './paymentMethod'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import ErrorWarning from '@/app/components/errors'
import { useRouter } from 'next/navigation'
import SweetAlert from '@/app/components/sweetAlert';


type Type = {
    id: number;
    type_name: string;
}

type PaymentMethod = {
    id: number;
    icon: string;
    name: string;
}

type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    type: {
        id: number;
        name: string
    }
}

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string | null
}

type EntrustedProduct = {
    id: number;
    product_name: string;
    supplier_name: string;
    purchase_price: number;
    sell_price: number;
    stock: number;
    description: string;
}

const Content = ({ types, menus, products, paymentMethods }: { types: Type[], menus: Menu[], paymentMethods: PaymentMethod[], products: EntrustedProduct[] }) => {
    const [searching, setSearching] = useState(false)
    const [selecting, setSelecting] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [searchedMenus, setSearchedMenus] = useState<Menu[]>([])
    const [selectedType, setSelectedType] = useState('Semua')
    const [selectedMenus, setSelectedMenus] = useState<Menu[]>([])
    const [filteredMenus, setFilteredMenus] = useState<Menu[]>([])
    const [total, setTotal] = useState(0)
    const [orderedMenus, setOrderedMenus] = useState<orderedMenu[]>([])
    const [selectedPayment, setSelectedPayment] = useState(0)
    const [isMutataing, setisMutating] = useState(false);
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter()

    console.log(orderedMenus)

    useEffect(() => {
        if (searching && selecting) {
            let data: Menu[] = menus.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) && item.type.name == selectedType)
            setFilteredMenus(data)
        }
    }, [searching, selecting, menus, name, selectedType])

    const handleSearchMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setName(value)
        let dataSearchedMenus: Menu[] = menus.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))

        value.length > 0 ? setSearching(true) : setSearching(false)
        setSearchedMenus(dataSearchedMenus)

        return true
    }

    const handleSelectCategory = (category: string) => {
        let dataSelectedMenus: Menu[] = []

        if (category == "Semua") {
            setSelecting(false)
            dataSelectedMenus = menus
        } else {
            setSelecting(true)
            dataSelectedMenus = menus.filter(item => item.type.name == category)
        }

        setSelectedType(category)
        setSelectedMenus(dataSelectedMenus)

        return true
    }


    const handleShowMenus = () => {
        if (!searching && !selecting)
            return <Menus menus={menus} products={products} type='Semua' setOrderedMenus={setOrderedMenus} orderedMenus={orderedMenus} setTotal={setTotal} />
        if (searching && !selecting)
            return <Menus menus={searchedMenus} products={products} type='Semua' setOrderedMenus={setOrderedMenus} orderedMenus={orderedMenus} setTotal={setTotal} />
        if (!searching && selecting)
            return <Menus menus={selectedMenus} products={products} type={selectedType} setOrderedMenus={setOrderedMenus} orderedMenus={orderedMenus} setTotal={setTotal} />
        if (searching && selecting)
            return filteredMenus.length > 0 ? <Menus products={products} menus={filteredMenus} type={selectedType} setOrderedMenus={setOrderedMenus} orderedMenus={orderedMenus} setTotal={setTotal} /> : <ErrorWarning message='Menu yang anda cari tidak ditemukan' />

        return <ErrorWarning message='Menu yang anda cari tidak ditemukan' />
    }

    const handleFormatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleTransaction = async () => {
        const data = {
            "total_payment": total,
            "payment_method_id": selectedPayment,
            "description": description,
            "menus": orderedMenus
        }

        setisMutating(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, data)
            console.log(res)
            setOrderedMenus([])
            setTotal(0)
            setSelectedPayment(0)
            setDescription("")
            setisMutating(false);

            setStatus(res.status);
            setMessage(res.data?.message)

            router.refresh()
        } catch (error: any) {
            console.log(error)
            setisMutating(false);
            setStatus(error.response.status);
            setMessage('Transaksi gagal ditambahkan')
            router.refresh();
        }
    }

    const resetState = () => {
        setStatus(false)
        router.refresh()
    }

    return (
        <div className='flex flex-wrap-reverse gap-5 items-end justify-start'>
            <div className="p-5 lg:basis-[65%] min-w-96 flex-1 w-full bg-white rounded-md">
                <div className="flex flex-wrap w-full items-center justify-between gap-2 mb-5">
                    <h1 className='text-black text-2xl font-bold'>Pilih Kategori</h1>
                    <div className='md:basis-1/2 h-10 w-full flex items-center justify-start bg-white rounded-lg px-2 py-1'>
                        <input type="text" onChange={handleSearchMenu} placeholder="Cari Menu" className="h-full bg-none outline-none flex-1 text-md" id='input-search-menu' />
                        <Icon icon="iconoir:search" width="24" height="24" className='cursor-pointer' />
                    </div>
                </div>
                <Types types={types} selectedType={selectedType} handleSelectType={handleSelectCategory} />
                {handleShowMenus()}
            </div>
            <div className="lg:basis-[30%] flex-1 bg-white p-5 rounded-md">
                <h2 className='text-black text-xl font-bold mb-3'>Pembayaran</h2>
                <SelectedMenu setTotal={setTotal} orderedMenus={orderedMenus} setOrderedMenus={setOrderedMenus} />
                <hr className='bg-slate-200 mb-4' />
                <div className="flex items-center justify-between font-bold mb-5 w-full">
                    <span className="text-sm">Total</span>
                    <span className="text-md">{handleFormatPrice(total)}</span>
                </div>
                <PaymentMethods selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} methods={paymentMethods} />
                <div className="mb-4">
                    <h2 className='text-black text-xl font-bold mb-3'>Keterangan</h2>
                    <textarea className='input w-full h-28 rounded p-2 text-sm border border-solid border-amber-200' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>

                {isMutataing ? (
                    <button type='button' disabled className="btn btn-sm bg-amber-400 capitalize w-full">Menyimpan...</button>
                ) : (
                    <button className="btn btn-sm bg-amber-400 capitalize w-full" onClick={handleTransaction}>Cetak Faktur</button>
                )}
            </div>
            {status && <SweetAlert status={status} message={message} resetState={resetState} />}
        </div>
    )
}

export default Content