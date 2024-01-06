'use client'
import React from 'react'

type PaymentMethod = {
    id: number;
    icon: string;
    name: string;
}

let styles = {
    default: "flex flex-col gap-2 items-center cursor-pointer justify-center carousel-item h-14 w-16 p-1 bg-amber-100 text-slate-900 rounded shadow-md font-bold text-center",
    selected: "flex flex-col gap-2 items-center cursor-pointer justify-center carousel-item h-14 w-16 p-1 bg-amber-100 text-slate-900 border border-solid border-amber-400 rounded shadow-md font-bold text-center",
}

const PaymentMethods = ({ methods, setSelectedPayment, selectedPayment }: { methods: PaymentMethod[], setSelectedPayment:  React.Dispatch<React.SetStateAction<number>>, selectedPayment: number }) => {
    return (
        <>
            <h2 className='text-black text-xl font-bold mb-3'>Metode Pembayaran</h2>
            <div className="carousel w-full space-x-4 mb-5">
                {methods.map((item, index) => (
                    <div key={index} className={selectedPayment == item.id ? styles.selected : styles.default} onClick={() => setSelectedPayment(item.id)}>
                        <img className='w-2/3 h-6' src={item.icon} alt='image payment method' />
                        <span className='text-[12px] leading-3'>{item.name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PaymentMethods