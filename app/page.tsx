import React from 'react'

const styleHero = {
  height: `calc(100vh - 4rem)`,
  backgroundImage: `url('/bg-hero.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const home = () => {
  return (
    <div style={styleHero}>
      <div className="w-full h-full bg-stone-950/70 flex flex-col items-center justify-center">
          <span className="text-base mb-2 font-normal text-slate-300">Selamat Datang di</span>
          <h1 className="text-7xl text-white font-bold italic mb-5">Techno Cafe</h1>
          <p className='text-lg text-white text-center w-full md:w-1/2'>Lakukan pemesanan makanan yang anda inginkan dengan sangat mudah dan cepat tanpa perlu ribet.</p>
      </div>  
    </div>
  )
}

export default home