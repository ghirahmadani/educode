import React from 'react'

import LessonHeader from '../components/header/LessonHeader'
import { Outlet } from 'react-router-dom'

const LearningLayout = () => {
  return (
    <>
      <LessonHeader/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default LearningLayout