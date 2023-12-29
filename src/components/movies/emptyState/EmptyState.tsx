import { FC } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/utils/constants"
import { Button, CenteredPage, Heading } from "@/components/ui"
import s from "./EmptyState.module.css"

const EmptyState: FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push(routes.CREATE_ROUTE)
  }

  return (
    <CenteredPage>
      <div className={s.container}>
        <Heading level={2}>Your movie list is empty</Heading>

        <Button padding="16px 28px" onClick={handleClick}>
          Add a new movie
        </Button>
      </div>
    </CenteredPage>
  )
}

export default EmptyState
