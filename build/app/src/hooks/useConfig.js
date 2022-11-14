import { useSearchParams } from "react-router-dom"

const useConfig = () => {
  const [params] = useSearchParams()
  const expandable = ['', '1', 'true'].includes(params.get('expandable'))
  const group = params.get('group') || 'all'
  const status = params.get('status') || 'all'
  const failedWithin = params.get('failedWithin')
  const layout = params.get('layout') || 'full'
  const monitor = !params.has('monitor') || ['', '1', 'true'].includes(params.get('monitor'))

  return {
    expandable,
    group,
    status,
    failedWithin,
    layout,
    monitor,
  }
}

export default useConfig