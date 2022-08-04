import localforage from "localforage"
import React, {
  createContext,
  CSSProperties,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
} from "react"

export interface ThemeContext {
  style?: CSSProperties
  setStyle: (style?: CSSProperties) => void
}

export const themeContext = createContext<ThemeContext>({
  setStyle: () => void null,
})

interface Props {
  children: ReactNode
}

const saveTheme = (style: CSSProperties | undefined): void => {
  localforage.setItem("style", style)
}

export function ThemeProvider({ children }: Props): ReactElement {
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    const getStyles = async () => {
      const stylesFromLocal = await localforage.getItem<CSSProperties>("style")
      setStyle(stylesFromLocal ?? undefined)
    }

    getStyles()
  }, [])

  useEffect(() => {
    saveTheme(style)
  }, [style])

  return (
    <themeContext.Provider value={{ style, setStyle }}>
      {children}
    </themeContext.Provider>
  )
}
