import { IndexedPerson } from "../types/IndexedPerson"
import { KimrofErrors } from "./kimrof/Types"

export function validatePerson(person: IndexedPerson) {
  const errors: KimrofErrors = {}

  if (!person.firstname) {
    errors.firstname = "The firstname is required!"
  }

  if (!person.surname) {
    errors.surname = "The surname is required!"
  }

  if (!person.email) {
    errors.email = "The email is required!"
  }

  return errors
}
