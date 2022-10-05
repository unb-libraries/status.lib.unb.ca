import { useState } from "react"
import useLocalStorage from "./useLocalStorage"

const useMonitor = (site) => {
  const ls = useLocalStorage('monitor', [])
  const getSites = () => ls.get()
  const [enabled, setEnabled] = useState(getSites().includes(site))

  const toggle = () => {
    const sites = getSites()
    if (!enabled) {
      sites.push(site)
    }
    else {
      sites.splice(getSites().findIndex(item => item === site), 1)
    }
    ls.set(sites)
    setEnabled(enabled => !enabled)
  }

  return [enabled, toggle]

}

export default useMonitor