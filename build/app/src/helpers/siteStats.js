export const SiteStatus = {
  PASS: 'passed',
  FAIL: 'failed',
}

const SiteStats = (pages) => {
  const runs = [].concat(...pages.map(page => [].concat(...page.tests.map(test => test.runs)))).filter((datetime, index, array) => array.indexOf(datetime) === index)
  const status = pages.some(page => page.tests.some(test => test.status === SiteStatus.FAIL))
    ? SiteStatus.FAIL
    : SiteStatus.PASS

  const tests = pages.reduce((tests, page) => tests.concat(...page.tests), [])
  const errors = tests.reduce((errors, test) => errors.concat(...test.errors), [])
  const unresolvedErrors = errors.filter(error => !error.hasOwnProperty('resolved'))
  const resolvedErrors = errors.filter(error => error.hasOwnProperty('resolved'))
  
  const failures = unresolvedErrors.length
  const failingSince = unresolvedErrors.length > 0
    ? Math.min(...unresolvedErrors.map(error => error.occurred))
    : false
  const passingSince = resolvedErrors.length > 0
    ? resolvedErrors.reduce((latest, error) => latest.resolved > error.resolved ? latest : error, resolvedErrors[0]).resolved
    : status === SiteStatus.PASS
      ? Math.min(...runs)
      : false

  return {
    status,
    tests,
    errors,
    failures,
    resolvedErrors: resolvedErrors.length,
    unresolvedErrors: unresolvedErrors.length,
    failingSince,
    passingSince,
  }
}

export default SiteStats