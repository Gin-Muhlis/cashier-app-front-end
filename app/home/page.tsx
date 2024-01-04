import axios from 'axios';
import React from 'react';

type Data = {
  transactionsAmount: number;
  stocksAmount: number;
  transactions: number;
}

const getData = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/data-home`)

  return response.data.data
}

const HomePage = async () => {
  const data: Data = await getData()

  const handleFormatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

  return (
    <>
      <div className="w-full p-3 rounded-lg bg-amber-300 text-black italic shadow-sm mb-5">
          <h1 className="text-lg">Selamat Datang <span className="font-bold">Shirakami Fubuki</span></h1>
      </div>
      <div className="flex items-start justify-start gap-8 flex-wrap">
        <div className="rounded-sm p-3 grow-0 basis-1/4 h-28 bg-cyan-500 flex flex-col justify-center gap-2 shadow-[10px_10px_6px_rgba(6,182,212,0.5)]">
          <span className="text-2xl text-white font-extrabold">{handleFormatPrice(data.transactionsAmount)}</span>
          <span className="text-sm text-white font-semibold">Pendapatan</span>
        </div>
        <div className="rounded-sm p-3 grow-0 basis-1/4 h-28 bg-purple-500 flex flex-col justify-center gap-2 shadow-[10px_10px_6px_rgba(168,85,247,0.5)]">
          <span className="text-2xl text-white font-extrabold">{data.transactions}</span>
          <span className="text-sm text-white font-semibold">Jumlah Transaksi</span>
        </div>
        <div className="rounded-sm p-3 grow-0 basis-1/4 h-28 bg-pink-500 flex flex-col justify-center gap-2 shadow-[10px_10px_6px_rgba(236,72,153,0.5)]">
          <span className="text-2xl text-white font-extrabold">{data.stocksAmount}</span>
          <span className="text-sm text-white font-semibold">Stok Menu</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
