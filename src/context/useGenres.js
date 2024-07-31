import { useContext } from 'react'

import { GenreContext } from './GenreContext'

const useGenres = () => {
  const context = useContext(GenreContext)
  if (context === undefined) {
    throw new Error('useGenres must be used within a GenreProvider')
  }
  return context
}

export default useGenres
