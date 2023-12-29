import { ButtonHTMLAttributes, CSSProperties, FC } from "react"
import s from "./Button.module.css"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  width?: string
  padding?: string
  color?: string
  border?: string
}

const Button: FC<IButton> = ({
  type,
  disabled,
  children,
  loading,
  width,
  color,
  padding,
  border,
  ...rest
}) => {
  const btnStyles: CSSProperties = {
    width: width || "auto",
    padding: padding || "16px",
    backgroundColor: color || "var(--primary-color)",
    border: border || "none"
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={s.button}
      style={btnStyles}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
