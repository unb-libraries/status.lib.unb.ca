const useLocalStorage = (key, initial = undefined) => {

  const get = () => {
    return JSON.parse(localStorage.getItem(key)) || initial
  }
  
  const set = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [get, set]
}

export default useLocalStorage