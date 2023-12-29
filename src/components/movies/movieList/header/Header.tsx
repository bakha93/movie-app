import { FC } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/utils/constants"
import { PlusIcon } from "@/components/icons"
import { LogoutButton } from "@/components/auth"
import { Heading } from "@/components/ui"
import s from "./Header.module.css"

const Header: FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push(routes.CREATE_ROUTE)
  }

  return (
    <header className={s.header}>
      <div className={s.logoContainer}>
        <Heading level={2}>My movies</Heading>

        <button type="button" className={s.button} onClick={handleClick}>
          <PlusIcon />
        </button>
      </div>

      <LogoutButton />
    </header>
  )
}

export default Header
