import { FC } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthProvider"
import { routes } from "@/utils/constants"
import { LogoutIcon } from "@/components/icons"
import s from "./LogoutButton.module.css"

const LogoutButton: FC = () => {
  const { signOut } = useAuth()

  const router = useRouter()

  const handleClick = () => {
    signOut()

    router.push(routes.HOME_ROUTE)
  }

  return (
    <button type="button" className={s.button} onClick={handleClick}>
      <span>Logout</span>

      <LogoutIcon />
    </button>
  )
}

export default LogoutButton
