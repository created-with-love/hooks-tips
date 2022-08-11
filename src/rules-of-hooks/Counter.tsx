import React, { ReactElement, useState, useEffect, useRef, useLayoutEffect } from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      // call html element focus function
      buttonRef.current?.focus()
    }, 1000)
  }, []);

  // useLayoutEffect works before page is pained, so glitch of change won't be visible
  useLayoutEffect(() => {
    if(buttonRef.current) {
      buttonRef.current.style.backgroundColor = "green";
    }
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
