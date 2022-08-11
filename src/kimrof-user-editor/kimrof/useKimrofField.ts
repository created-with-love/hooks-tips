import {ChangeEvent, useCallback, useContext} from "react"
import { kimrofContext } from './KimrofContext';

//allows input components to work. Returns an object with a value and onChange prop
export const useKimrofField = (name: string) => {
  const {values, setFieldValue, errors} = useContext(kimrofContext)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.name, e.target.value)
  }, [setFieldValue])

  return {
    value: values[name],
    error: errors[name],
    onChange
  } as const
}
