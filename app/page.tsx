"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import LoadingPage from "./loading"
import { Button } from "./components/Button"

const HomePage = () => {
  return (
    <>
      <h1>Welcome To Traversy Meida</h1>
      <Button
        label="Hello!"
        onClick={() => {
          console.log("Hello!")
        }}
      />
    </>
  )
}
export default HomePage
