import { useSearchParams } from "react-router-dom"

const useConfig = () => {
  const [params] = useSearchParams()
  const expandable = ['', '1', 'true'].includes(params.get('expandable'))
  const filter = params.get('filter') || 'all'
  const layout = params.get('layout') || 'full'

  return {
    expandable,
    filter,
    layout,
  }
}

export default useConfig