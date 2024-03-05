import Image from 'next/image'
import React from 'react'

const aboutPage = () => {
  return (
    <div className='w-full rounded p-7 bg-white'>
      <div className="w-full mb-7">
        <div className="w-full flex items-center justify-between gap-7">
          <div>
            <h1 className='text-2xl text-black font-bold mb-3 italic'>Tentang Techno Cashier</h1>
            <p className='text-gray-800 text-md leading-7'>
              Techno Cashier adalah aplikasi kasir inovatif yang dirancang untuk memenuhi kebutuhan bisnis modern dalam mengelola transaksi keuangan mereka. Dengan fitur-fitur canggih dan antarmuka yang intuitif, Techno Cashier membawa pengalaman kasir ke tingkat berikutnya, memungkinkan pemilik bisnis untuk mengoptimalkan operasi mereka dan meningkatkan efisiensi.
            </p>
          </div>
          <Image src="/images/techno.jpg" alt='gambar techno' className='rounded-md object-cover' width={350} height={400} />
        </div>
      </div>
      <div className="w-full mb-7">
        <h1 className='text-2xl text-black font-bold mb-3 italic'>Layanan Aplikasi</h1>
        <p className='text-gray-800 text-md leading-7'>
          Techno Cashier menyediakan fitur dan layanan yang akan memudahkan sistem pengoperasi kasir pada cafe. Diantanya:

        </p>
        <ul className='ml-3'>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
              1. Antarmuka Intuitif
            </span>
            <p className="text-sm">
              Techno Cashier dirancang dengan antarmuka yang ramah pengguna, memastikan bahwa pengguna dari berbagai latar belakang dapat dengan mudah mengakses dan menggunakan aplikasi ini tanpa memerlukan pelatihan khusus.
            </p>
          </li>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
              2. Manajemen Inventaris yang Cerdas
            </span>
            <p className="text-sm">
              Dengan fitur manajemen inventaris yang canggih, Techno Cashier memungkinkan pengguna untuk melacak stok barang dengan mudah, mengatur pemesanan ulang, dan mengoptimalkan persediaan mereka untuk menghindari kekurangan atau kelebihan persediaan.
            </p>
          </li>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
              3. Pemrosesan Transaksi yang Cepat dan Aman
            </span>
            <p className="text-sm">
              Aplikasi ini memungkinkan pengguna untuk memproses transaksi dengan cepat dan aman, baik itu pembayaran tunai, kartu kredit, atau metode pembayaran digital lainnya. Keamanan data pelanggan dijaga dengan ketat untuk memastikan privasi mereka terlindungi.
            </p>
          </li>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
              4. Pelaporan dan Analisis yang Komprehensif
            </span>
            <p className="text-sm">
              analisis yang berguna, memungkinkan pemilik bisnis untuk melacak kinerja penjualan, menganalisis tren, dan membuat keputusan yang didasarkan pada data yang akurat.
            </p>
          </li>
          <li>
            <span className="text-md font-bold inline-block mb-1">
              5. Fleksibilitas dan Skalabilitas
            </span>
            <p className="text-sm">
              Dibangun dengan teknologi yang canggih, Techno Cashier dapat disesuaikan dengan kebutuhan bisnis yang berkembang. Dari usaha kecil hingga perusahaan besar, aplikasi ini dapat ditingkatkan dan disesuaikan sesuai dengan pertumbuhan bisnis Anda.
            </p>
          </li>
        </ul>
      </div>
      <div className="w-full mb-7">
        <h1 className='text-2xl text-black font-bold mb-3 italic'>Sejarah Dibuatnya Techno Cashier</h1>
        <p className='text-gray-800 text-md leading-7'>
          Pada awalnya, industri kafe mengalami tantangan yang signifikan dalam hal manajemen kasir. Sistem kasir tradisional seringkali tidak memadai untuk memenuhi kebutuhan bisnis yang semakin berkembang dan kompleks. Itulah mengapa Techno Cashier lahir sebagai solusi untuk mengatasi masalah ini.
        </p>
      </div>
    </div>
  )
}

export default aboutPage