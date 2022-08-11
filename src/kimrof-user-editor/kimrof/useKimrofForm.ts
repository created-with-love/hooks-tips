import {useCallback, useContext} from "react"

import { kimrofContext } from "./KimrofContext"

export const useKimrofForm = () => {
    const {submitForm} = useContext(kimrofContext)

    const onSubmit = useCallback(
      (e:React.FormEvent) => {
        e.preventDefault()
        submitForm()
      },
      [submitForm]
    )

    return {
      onSubmit
    } as const
}
