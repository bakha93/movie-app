import { FC, FormEvent, useState } from "react"
import { useAuth } from "@/contexts/AuthProvider"
import {
  Button,
  CenteredPage,
  Checkbox,
  Heading,
  InputField
} from "@/components/ui"
import { IInputData } from "@/types"
import s from "./SignInForm.module.css"

const initialData = {
  email: "",
  password: ""
}

const SignInForm: FC = () => {
  const [inputData, setInputData] = useState(initialData)
  const [rememberMe, setRememberMe] = useState(false)

  const { email, password } = inputData

  const { signIn } = useAuth()

  const handleInputChange = ({ name, value }: IInputData) => {
    setInputData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCheckboxChange = () => {
    setRememberMe((prevState) => !prevState)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    signIn({ ...inputData, rememberMe })
  }

  return (
    <CenteredPage>
      <div className={s.container}>
        <Heading level={1}>Sign in</Heading>

        <form className={s.form} onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email: admin"
            value={email}
            onInputChange={handleInputChange}
          />
          <InputField
            name="password"
            placeholder="Password: admin"
            value={password}
            onInputChange={handleInputChange}
          />
          <Checkbox
            name="rememberMe"
            label="Remember me"
            isChecked={rememberMe}
            onCheck={handleCheckboxChange}
          />
          <Button type="submit" width="100%">
            Login
          </Button>
        </form>
      </div>
    </CenteredPage>
  )
}

export default SignInForm
