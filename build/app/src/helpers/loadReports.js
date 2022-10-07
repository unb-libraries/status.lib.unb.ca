const sort = (a, b) => {
  const [valA, valB] = [a, b]
    .map(value => value
    .toLowerCase()
    .replace(/[^a-z]/, ''))
  return valA > valB ? 1 : (valA < valB ? -1 : 0)
}

const loadReports = async (url) => {
  const response = await fetch(url)
  
  const sites = await response.json()
  sites.sort((s1, s2) => sort(s1.title, s2.title))
  
  const groups = Array.from(new Set([].concat(...sites.map(site => site.groups))))
  groups.sort(sort)

  return {
    sites,
    groups,
  }
}

export default loadReports