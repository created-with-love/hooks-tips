import {useState, useEffect} from 'react';
import localforage from "localforage";
import { Person } from "../types/person"

const savePerson = (person: Person | null): void => {
  console.log("🚀 person", person)
  localforage.setItem("person", person)
};

export const usePerson = (initialPerson: Person) => {
  const [person, setPerson] = useState<Person | null>(null)

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      setPerson(person ?? initialPerson)
    }

    getPerson()
  }, [initialPerson])

  useEffect(() => {
    savePerson(person)
  }, [person])

  return [person, setPerson];
};
