import { KimrofObject, KimrofProperty, KimrofErrors } from "./Types"

interface SetPropertyAction {
  type: "set-property"
  payload: { name: string; value: KimrofProperty }
}

interface ValidationResultAction {
  type: 'validation-result'
  payload: KimrofErrors
}

type SomeAction = SetPropertyAction | ValidationResultAction

export interface Metadata {
  isDirty: boolean
  isValid: boolean | null
}

interface ReducerState {
  values: KimrofObject
  metadata: Metadata
  errors: KimrofErrors
}

export function kimrofReducer(
  state: ReducerState,
  action: SomeAction
): ReducerState {
  switch(action.type) {
    case "set-property":
      return {
        ...state,
        metadata: {...state.metadata, isDirty: true, isValid: null},
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value
        }
      }
    case 'validation-result':
      return {
        ...state,
        metadata: {
          ...state.metadata,
          isValid: Object.keys(action.payload).length === 0
        },
        errors: action.payload
      }
    default:
      return state
  }
}
