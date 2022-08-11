// Kimrof = Formik reversed :-)

import React, { ReactElement, ReactNode, useCallback, useMemo, useReducer } from "react"

import { KimrofObject, KimrofProperty, KimrofErrors } from "./Types"
import { KimrofContext, kimrofContext } from './KimrofContext'
import { kimrofReducer } from "./kimrofReducer"
import { useThrottle } from "../../utils/hooks/useThrottle"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
  onSubmit: (values: TData) => void
  validate?: (values: TData) => KimrofErrors
}

export function Kimrof<TData extends KimrofObject>({
  children,
  initialValues,
  onSubmit,
  validate
}: Props<TData>): ReactElement {
  const [{values, errors, metadata}, dispatch] = useReducer(kimrofReducer, {
    values: initialValues,
    metadata: { isDirty: false, isValid: true},
    errors: {}
  })

  const context: KimrofContext = useMemo(
    () => ({
      values,
      metadata,
      errors,
      setFieldValue: (name: string, value: KimrofProperty) => {
        dispatch({ type: 'set-property', payload: {name, value}})
      },
      submitForm: () => onSubmit(values as TData)
    }),
    [values, metadata, errors, onSubmit]
  )

  const validateValues = useCallback(() => {
    if (validate) {
      const errors = validate(values as TData)
      dispatch({type: 'validation-result', payload: errors})
    }
  }, [validate, values])

  useThrottle(validateValues, 100)

  return <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider >
}
