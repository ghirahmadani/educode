import "./App.css"

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import RegisterPage from "./pages/RegisterPage";
import HelpPage from "./pages/HelpPage";
import LearningPage from "./pages/LearningPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Landing/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage/>} />
      </Route>
      <Route path='home' element={<MainLayout/>} >
        <Route index element={<Main/>} />
        <Route path='learning' element={<LearningPage/>} />
        <Route path='learning/:id' element={<LearningPage/>} />
        <Route path='help' element={<HelpPage/>} />
      </Route>
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
