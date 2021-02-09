import {useCallback, useState} from "react";

const baseUrl = "https://swapi.dev/api/"


export type responseDataType = {
  count: number
  next: string
  previous: string | null
  results: []
}

export const useGetResource = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | number | null>(null)
  const request = useCallback(async (endPoint?: string, id?: number) => {
    setLoading(true)
    return fetch(`${baseUrl}${endPoint}/${id || ""}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(res.status)
        }
      })

      .then(json => {
        return json
      })

      .catch(e => setError(e.message))

      .finally(() => setLoading(false))
  }, [])

  const clearError = () => setError(null)

  return {isLoading, error, request, clearError}

}


