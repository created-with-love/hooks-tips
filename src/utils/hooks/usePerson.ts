import {useReducer, useEffect, useCallback, useDebugValue, SetStateAction} from 'react';
import { useIsMounted } from './useIsMounted';
import localforage from "localforage";
import { Person } from "../../types/person";
import { useDebounce } from './useDebounce';
import { useWillUnmount } from './useWillUnmount';
import { personEditorReducer } from '../personEditorReducer';

// custom hook to keep all logic in one basket
const savePerson = (person: Person | null): void => {
  console.log("🚀 person", person)
  localforage.setItem("person", person)
};

export const usePerson = (initialPerson: Person) => {
  // const [person, setPerson] = useState<Person | null>(null);
  // const [metadata, setMetadata] = useState<Metadata>({isDirty: false, isValid: true})
  const [{person, metadata}, dispatch] = useReducer(personEditorReducer, {
    person: null,
    metadata: {isDirty: false, isValid: true}
  })
  const isMounted = useIsMounted();

  useDebugValue(person, (p) => `${p?.firstname} ${p?.surname}`)

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      // await sleep(500);
      if (isMounted.current) {
        // set person only after page is mounted to prevent error
        // setPerson(person ?? initialPerson)
        dispatch({
          type: 'set-initial-person',
          payload: person ?? initialPerson
        })
      }
    }

    getPerson()
  }, [initialPerson, isMounted])

  // this block cause component re-render, so can be helpful to find page bugs
  // const [, setNow] = useState(new Date())
  // useEffect(() => {
  //   const handle = setInterval(() => setNow(new Date()), 1500)

  //   return () => clearInterval(handle)
  // }, [])

  // function will change only if person obj changes
  const saveFn = useCallback(() => {
    savePerson(person)
  }, [person])

  // debounce calls to index.db
  useDebounce(saveFn, 1000);

  // also save person before component will be unmount to prevent data lost with small window of debounce
  useWillUnmount(saveFn);

  const setPersonAndMeta = (value: SetStateAction<Person | null>): void => {
    // setPerson(value);
    // setMetadata(m => ({...m, isDirty: true}))
    // TODO: Validate
  }

  const setProperty = (name: keyof Person, value: unknown): void => {
    dispatch({type: 'set-property', payload: {name, value}})
  }

  const setProperties = (payload: Partial<Person>): void => {
    dispatch({type: 'set-properties', payload})
  }

  return [person, setProperty, setProperties, metadata] as const;
};
