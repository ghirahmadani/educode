import React from 'react'
import { Outlet } from 'react-router-dom'

import MainHeader from '../components/header/MainHeader'
import BottomNavigation from '../components/footer/BottomNavigation'

const MainLayout = () => {
  return (
    <>
        <MainHeader/>

        <main>
            <Outlet/>
        </main>
        
        <BottomNavigation/>
    </>
  )
}

export default MainLayout