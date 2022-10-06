import { useEffect, useRef } from "react"

const useAfterRenderEffect = (effect, dependencies) => {
  const hasRendered = useRef(false)
  
  useEffect(() => {
    if (hasRendered.current) {
      effect()
    }
    else {
      hasRendered.current = true
    }
  }, [...dependencies])
}

export default useAfterRenderEffect