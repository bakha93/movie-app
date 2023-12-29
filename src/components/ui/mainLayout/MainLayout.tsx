import { FC } from "react"
import { IChildren } from "@/types"
import s from "./MainLayout.module.css"

const MainLayout: FC<IChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <main className={s.content}>{children}</main>

      <footer className={s.footer} />
    </div>
  )
}

export default MainLayout
