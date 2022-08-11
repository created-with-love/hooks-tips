import {useContext} from "react"
import { kimrofContext } from "./KimrofContext"

export const useKimrof = () => {
  const {values, metadata} = useContext(kimrofContext)

  return {values, metadata} as const
}
