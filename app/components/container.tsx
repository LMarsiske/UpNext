import React, { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-9/12 mx-auto">{children}</div>
}

export default Container
