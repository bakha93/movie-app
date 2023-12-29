import { FC } from "react"
import { IChildren } from "@/types"
import s from "./MarginContainer.module.css"

const MarginContainer: FC<IChildren> = ({ children }) => {
  return <div className={s.container}>{children}</div>
}

export default MarginContainer
