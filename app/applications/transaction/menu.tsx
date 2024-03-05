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
    image: string | null;
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


const Menus = ({ menus, products, type, setOrderedMenus, orderedMenus, setTotal }: { menus: Menu[], type: string, products: EntrustedProduct[], setOrderedMenus: React.Dispatch<React.SetStateAction<orderedMenu[]>>, orderedMenus: orderedMenu[], setTotal: React.Dispatch<React.SetStateAction<number>> }) => {

    const handleChoiceMenus = (
        menu_id: number,
        name: string,
        quantity: number,
        unit_price: number,
        image: string | null,
        isEntrusted: boolean,
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
                        isEntrusted
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
                isEntrusted
            };

            setOrderedMenus((prev) => [...prev, newMenu]);
            setTotal(prev => prev + newMenu.unit_price)

        }

        return true;
    };

    return (
        <div>
            <h2 className='text-black text-2xl font-bold mb-5'>{type} Menu</h2>
            <div className="w-full flex flex-wrap items-start justify-start gap-2 mb-8">
                {menus.map((item, index) => (
                    <div key={index} className="card card-compact bg-base-100 shadow-xl">
                        <figure className="shadow w-52"><img className="w-full h-full object-cover" src={item.image} alt="Menu Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold mb-3">{item.name}</h2>

                            <div className="card-actions justify-between items-center">
                                <span className='italic text-lg text-amber-400 font-semibold mb-3'>{handleFormatPrice(item.price)}</span>
                                <button className="btn btn-xs bg-amber-300 capitalize" onClick={() => handleChoiceMenus(item.id, item.name, 1, item.price, item.image, false)}>Pilih Menu</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h2 className='text-black text-2xl font-bold mb-5'>Produk Titipan</h2>
                <div className="w-full flex flex-wrap items-start justify-start gap-2 mb-8">
                    {products.map((item, index) => (
                        <div key={index} className="card card-compact bg-base-100 shadow-xl">

                            <div className="card-body">
                                <h2 className="card-title font-bold mb-3">{item.product_name}</h2>

                                <div className="card-actions justify-between items-center">
                                    <span className='italic text-lg text-amber-400 font-semibold mb-3'>{handleFormatPrice(item.sell_price)}</span>
                                    <button className="btn btn-xs bg-amber-300 capitalize" onClick={() => handleChoiceMenus(item.id, item.product_name, 1, item.sell_price, null, true)}>Pilih Menu</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Menus