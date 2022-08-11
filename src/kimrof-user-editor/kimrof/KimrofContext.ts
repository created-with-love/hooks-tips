import { Metadata } from './kimrofReducer';
import { createContext } from "react"

import { KimrofObject, KimrofProperty, KimrofErrors } from "./Types"

export interface KimrofContext {
  values: KimrofObject
  metadata: Metadata
  errors: KimrofErrors
  setFieldValue: (name: string, value: KimrofProperty) => void
  submitForm: () => void
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
  errors: {},
  metadata: { isDirty: false, isValid: true},
  setFieldValue: () => void null,
  submitForm: () => void null
})
