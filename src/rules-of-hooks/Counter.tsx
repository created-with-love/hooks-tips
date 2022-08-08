import React, { ReactElement, useState, useEffect, useRef } from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      // call html element focus function
      buttonRef.current?.focus()
    }, 1000)
  }, []);

  return (
    <div>
      <div>Count: {counter}</div>
      <div>
        <button
          ref={buttonRef}
          className="btn btn-primary"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  )
}
