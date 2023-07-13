import "./App.css"

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";
import LearningLayout from "./layouts/LearningLayout";

import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import RegisterPage from "./pages/RegisterPage";
import HelpPage from "./pages/HelpPage";
import LearningPage from "./pages/LearningPage";
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound";

import LessonSection from "./components/LessonSection"
import StudyPage from "./pages/StudyPage";
import AdminLearning from "./components/AdminLearning";
import AdminLesson from "./components/AdminLesson";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Landing/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage/>} />
      </Route>
      <Route path='/home' element={<MainLayout/>} >
        <Route index element={<Main/>} />
        <Route path='learning' element={<StudyPage/>} />
        <Route path='learning/:classId' element={<LearningPage/>} />
        <Route path='help' element={<HelpPage/>} />
      </Route>
      <Route path='lesson/:learningId' element={<LearningLayout/>}>
        <Route index element={<LessonSection/>}/>
      </Route>
      <Route path='/admin' element={<Admin/>} />
      <Route path='/admin/:classId' element={<AdminLearning/>} />
      <Route path='/admin/:classId/:learningId' element={<AdminLesson/>} />

      <Route path='*' element={<NotFound/>} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
