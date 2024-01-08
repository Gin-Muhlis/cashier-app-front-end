'use client'

import { useState } from "react";

type Menu = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string;
}

const handleDescription = (string: string) => {
    const limit = 15
    const words = string.split(' ')
    const truncated = words.slice(0, limit).join(' ')

    return words.length > limit ? `${truncated}...` : truncated
}

const handleFormatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}


const Menus = ({ menus, type, setOrderedMenus, orderedMenus, setTotal }: { menus: Menu[], type: string, setOrderedMenus: React.Dispatch<React.SetStateAction<orderedMenu[]>>, orderedMenus: orderedMenu[], setTotal: React.Dispatch<React.SetStateAction<number>>}) => {

    const handleChoiceMenus = (
        menu_id: number,
        name: string,
        quantity: number,
        unit_price: number,
        image: string
    ) => {
        const existingMenu = orderedMenus.find((item) => item.menu_id === menu_id);

        if (existingMenu) {

            const updatedMenus = orderedMenus.map((menu) => {
                if (menu.menu_id === menu_id) {
                    setTotal(prev => prev + menu.unit_price)
                    return {
                        ...menu,
                        quantity: menu.quantity + quantity,
                        sub_total: (menu.quantity + quantity) * menu.unit_price,
                    }
                    

                } else {
                    return menu
                }
            });

            setOrderedMenus(updatedMenus);
        } else {

            const newMenu = {
                menu_id,
                name,
                quantity,
                unit_price,
                sub_total: quantity * unit_price,
                image,
            };

            setOrderedMenus((prev) => [...prev, newMenu]);
            setTotal(prev => prev + newMenu.unit_price)
        
        }

        return true;
    };




    return (
        <div>
            <h2 className='text-black text-2xl font-bold mb-5'>{type} Menu</h2>
            <div className="w-full grid md:grid-cols-2 gap-7">
                {menus.map((item, index) => (
                    <div key={index} className="card card-compact bg-base-100 shadow-xl">
                        <figure className="shadow h-44"><img className="w-full h-full object-cover" src={item.image} alt="Menu Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{item.name}</h2>
                            <p className='mb-2 h-16'>{handleDescription(item.description)}</p>
                            <span className='italic text-lg text-amber-400 font-semibold mb-3'>{handleFormatPrice(item.price)}</span>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm bg-amber-300 capitalize" onClick={() => handleChoiceMenus(item.id, item.name, 1, item.price, item.image)}>Pilih Menu</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menus