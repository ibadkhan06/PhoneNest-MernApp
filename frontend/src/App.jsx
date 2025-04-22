import React from "react"
import {Header,Footer} from "./components/index"
import { Outlet } from "react-router-dom"

function App() {
 

  return (
    <>
    <Header/>
    <main>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}
export default App
