import React, { createContext } from 'react'

const ApiKeyContext = createContext('')

export const ApiKeyProvider = ApiKeyContext.Provider

export default ApiKeyContext
