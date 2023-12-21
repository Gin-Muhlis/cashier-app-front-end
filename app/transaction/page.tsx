
import React from 'react'
import SearchMenu from './searchMenu'
import Types from './type'
import Menus from './menu'
import SelectedMenu from './selectedMenu'
import PaymentMethods from './paymentMethod'

const Transaction = () => {
    return (
        <div className='flex flex-wrap-reverse items-start justify-start min-h-full relative'>
            <div className="p-5 md:basis-[70%]">
                <div className="flex items-center justify-between gap-2 mb-5">
                    <h1 className='text-black text-3xl font-bold'>Pilih Kategori</h1>
                    <SearchMenu />
                </div>
                <Types />
                <Menus />
            </div>
            <div className="md:w-80 w-full flex-1 flex-grow bg-white px-4 pt-7 pb-5 h-[92vh] md:fixed md:top-12 md:right-0">
                <h2 className='text-black text-xl font-bold mb-8'>Pembayaran</h2>
                <SelectedMenu />
                <hr className='bg-slate-200 mb-4' />
                <div className="flex items-center justify-between font-bold mb-5">
                    <span className="text-sm">Total</span>
                    <span className="text-md">Rp.30.0000</span>
                </div>
                <PaymentMethods />
                <button className="btn btn-sm bg-amber-400 capitalize w-full">Cetak Faktur</button>
            </div>
        </div>
    )
}

export default Transaction