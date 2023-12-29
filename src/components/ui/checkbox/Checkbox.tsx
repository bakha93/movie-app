import { FC } from "react"
import s from "./Checkbox.module.css"

interface ICheckbox {
  name: string
  label: string
  isChecked: boolean
  onCheck: () => void
}

const Checkbox: FC<ICheckbox> = ({ name, label, isChecked, onCheck }) => {
  return (
    <div className={s.container}>
      <input
        id={name}
        type="checkbox"
        checked={isChecked}
        className={s.checkbox}
        onChange={onCheck}
      />

      <label htmlFor={name} className={s.label}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
