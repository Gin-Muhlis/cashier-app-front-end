import React from 'react'

const PaymentMethods = () => {
    return (
        <>
            <h2 className='text-black text-xl font-bold mb-2'>Metode Pembayaran</h2>
            <div className="carousel w-full py-2 space-x-4 mb-5">
                <div className="flex flex-col gap-2 items-center justify-center carousel-item h-14 w-16 p-1 bg-amber-100 text-slate-900 border border-solid border-amber-400 rounded shadow-md font-bold text-center">
                    <img className='object-cover w-2/3 h-6' src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                    <span className='text-[12px] leading-3'>Cash</span>
                </div>
            </div>
        </>
    )
}

export default PaymentMethods