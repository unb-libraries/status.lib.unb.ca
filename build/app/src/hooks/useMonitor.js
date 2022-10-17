import { useCallback, useEffect, useState } from "react"
import useLocalStorage from "./useLocalStorage"

const Permission = {
  DENIED: 1,
  UNKNOWN: 2,
  GRANTED: 4,
}

export const Monitor = {
  DISABLED: 1,
  UNKNOWN: 2,
  OFF: 4,
  ON: 8,
}

const useMonitor = (site) => {
  const [load, save] = useLocalStorage('monitor', [])
  const [status, setStatus] = useState(Monitor.UNKNOWN)

  const getSites = useCallback(() => load(), [load])

  const getPermission = useCallback(async (force = false) => {
    switch (Notification.permission) {
      case 'denied': return Permission.DENIED
      case 'granted': return Permission.GRANTED
      case 'default':
      default:
        return !force 
        ? Permission.UNKNOWN
        : await Notification.requestPermission() === 'granted'
          ? Permission.GRANTED
          : Permission.DENIED
    }
  }, [])

  const getStatus = useCallback(async (force = false) => {
    const permission = await getPermission(force)
    switch (permission) {
      case Permission.GRANTED:
        if (status < Monitor.OFF) {
          const newStatus = getSites().includes(site) ? Monitor.ON : Monitor.OFF
          setStatus(newStatus)
          return newStatus
        }
        return status
      case Permission.DENIED:
        return Monitor.DISABLED
      case Permission.UNKNOWN:
      default:
        return Monitor.UNKNOWN
    }
  }, [getPermission, site, getSites, status])

  useEffect(() => {
    (async () => {
      setStatus(await getStatus())
    })()
  }, [getStatus])

  const toggle = async () => {
    const currentStatus = await getStatus(true)
    if (currentStatus !== Monitor.DISABLED) {
      const sites = getSites()
      if (currentStatus === Monitor.OFF) {
        sites.push(site)
        setStatus(Monitor.ON)
      }
      else {
        sites.splice(getSites().findIndex(item => item === site), 1)
        setStatus(Monitor.OFF)
      }
      save(sites)
    }
  }

  return [status, toggle]

}

export default useMonitor