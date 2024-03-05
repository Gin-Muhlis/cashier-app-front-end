'use client'
import React, { useState } from 'react'

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string | null;
}

const SelectedMenu = ({ orderedMenus, setOrderedMenus, setTotal }: { orderedMenus: orderedMenu[], setOrderedMenus: React.Dispatch<React.SetStateAction<orderedMenu[]>>, setTotal: React.Dispatch<React.SetStateAction<number>> }) => {

    const handleFormatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleIncreaseQuantity = (menu_id: number) => {
        const updatedMenus = orderedMenus.map((menu) => {
      
            if (menu.menu_id === menu_id) {
                setTotal(prev => prev + menu.unit_price)
                return {
                    ...menu,
                    quantity: menu.quantity + 1,
                    sub_total: (menu.quantity + 1) * menu.unit_price,
                }
            } else {
                return menu
            }

        });

        setOrderedMenus(updatedMenus);
    }
    const handleDecreaseQuantity = (menu_id: number) => {

        const updatedMenus = orderedMenus.map((menu) => {
            
            if (menu.menu_id === menu_id) {
                let newQuantity = menu.quantity - 1
                setTotal(prev => prev - menu.unit_price)
            
                return {
                    ...menu,
                    quantity: newQuantity,
                    sub_total: newQuantity * menu.unit_price,
                }
            } else {
                return menu
            }
        }).filter (item => item.quantity > 0);

        setOrderedMenus(updatedMenus);
    }

    return (
        <div className="flex flex-col gap-4 w-full overflow-y-scroll selected-menus pr-2 mb-4">
            {orderedMenus.map((item, index) => (
                <div key={index} className="flex items-start justify-start gap-2 w-full">
                    <figure><img className="w-12 h-12 bg-amber-300 rounded-sm" src={item.image?.toString()} alt="image menu" /></figure>
                    <div className='flex-1'>
                        <h4 className='text-md font-bold'>{item.name}</h4>
                        <div className="flex items-center justify-between w-full text-md">
                            <div className="flex items-center justify-center gap-2">
                            <span className='cursor-pointer' onClick={() => handleDecreaseQuantity(item.menu_id)}>-</span>
                                <span>{item.quantity}</span>
                                <span className='cursor-pointer' onClick={() => handleIncreaseQuantity(item.menu_id)}>+</span>
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