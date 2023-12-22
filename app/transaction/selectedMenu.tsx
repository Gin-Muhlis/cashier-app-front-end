'use client'
import React from 'react'

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
}

const SelectedMenu = ({ orderedMenus }: { orderedMenus: orderedMenu[] }) => {
    const handleFormatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    return (
        <div className="flex flex-col gap-4 w-full h-2/5 overflow-y-scroll selected-menus pr-2 mb-4">
            {orderedMenus.map((item, index) => (
                <div key={index} className="flex items-start justify-start gap-2 w-full">
                    <div className="w-12 h-12 bg-amber-300 rounded-sm"></div>
                    <div className='flex-1'>
                        <h4 className='text-md font-bold'>{item.name}</h4>
                        <div className="flex items-center justify-between w-full text-md">
                            <div className="flex items-center justify-center gap-2">
                                <span className='cursor-pointer'>-</span>
                                <span>{item.quantity}</span>
                                <span className='cursor-pointer'>+</span>
                            </div>
                            <span className="text-slate-400">{handleFormatPrice(item.sub_total)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SelectedMenu