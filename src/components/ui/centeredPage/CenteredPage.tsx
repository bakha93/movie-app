import { FC } from "react"
import { IChildren } from "@/types"
import s from "./CenteredPage.module.css"

const CenteredPage: FC<IChildren> = ({ children }) => {
  return <div className={s.container}>{children}</div>
}

export default CenteredPage
