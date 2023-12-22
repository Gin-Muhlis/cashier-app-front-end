'use client'

import React, { useEffect, useState } from 'react'
import Types from './type'
import Menus from './menu'
import SelectedMenu from './selectedMenu'
import PaymentMethods from './paymentMethod'
import { Icon } from '@iconify/react/dist/iconify.js'
import ErrorWarning from '../ErrorWarning'

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
}

const Content = ({ types, menus, paymentMethods }: { types: Type[], menus: Menu[], paymentMethods: PaymentMethod[] }) => {
    const [searching, setSearching] = useState(false)
    const [selecting, setSelecting] = useState(false)
    const [name, setName] = useState("")
    const [searchedMenus, setSearchedMenus] = useState<Menu[]>([])
    const [selectedType, setSelectedType] = useState('Semua')
    const [selectedMenus, setSelectedMenus] = useState<Menu[]>([])
    const [filteredMenus, setFilteredMenus] = useState<Menu[]>([])
    const [total, setTotal] = useState(0)
    const [orderedMenus, setOrderedMenus] = useState<orderedMenu[]>([])

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
            return <Menus menus={menus} type='Semua' />
        if (searching && !selecting)
            return <Menus menus={searchedMenus} type='Semua' />
        if (!searching && selecting)
            return <Menus menus={selectedMenus} type={selectedType} />
        if (searching && selecting) 
            return filteredMenus.length > 0 ? <Menus menus={filteredMenus} type={selectedType} /> : <ErrorWarning message='Menu yang anda cari tidak ditemukan' />
        
        return <ErrorWarning message='Menu yang anda cari tidak ditemukan' />
    }

    return (
        <div className='flex flex-wrap-reverse items-start justify-start min-h-full relative'>
            <div className="p-5 md:basis-[70%]">
                <div className="flex items-center justify-between gap-2 mb-5">
                    <h1 className='text-black text-3xl font-bold'>Pilih Kategori</h1>
                    <div className='w-1/2 h-10 flex items-center justify-start bg-white rounded-lg px-2 py-1'>
                        <input type="text" onChange={handleSearchMenu} placeholder="Cari Menu" className="h-full bg-none outline-none flex-1 text-md" id='input-search-menu' />
                        <Icon icon="iconoir:search" width="24" height="24" className='cursor-pointer' />
                    </div>
                </div>
                <Types types={types} selectedType={selectedType} handleSelectType={handleSelectCategory} />
                {handleShowMenus()}
            </div>
            <div className="md:w-80 w-full flex-1 flex-grow bg-white px-4 pt-7 pb-5 h-[92vh] md:fixed md:top-12 md:right-0">
                <h2 className='text-black text-xl font-bold mb-8'>Pembayaran</h2>
                <SelectedMenu orderedMenus={orderedMenus} />
                <hr className='bg-slate-200 mb-4' />
                <div className="flex items-center justify-between font-bold mb-5">
                    <span className="text-sm">Total</span>
                    <span className="text-md">{total}</span>
                </div>
                <PaymentMethods methods={paymentMethods} />
                <button className="btn btn-sm bg-amber-400 capitalize w-full">Cetak Faktur</button>
            </div>
        </div>
    )
}

export default Content