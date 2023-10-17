import React from 'react'
import MainHeader from './MainHeader'

const MainLayout = ({children} : {children: React.ReactNode }) => {
  return (
    <>
        <MainHeader />
        <main>
            {children}
        </main>
    </>
  )
}

export default MainLayout