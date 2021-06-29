import { createContext } from 'react'

export const camContext = createContext<[boolean?, React.Dispatch<React.SetStateAction<boolean>>?]>(
    [],
)
