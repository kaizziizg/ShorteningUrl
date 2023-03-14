function getUTCCurrentTime (): string {
  const localeTimeObj = new Date(Date.now())
  return localeTimeObj.toUTCString()
}

function getUTCLifeTime (offsetDay: number): string {
  const localeTimeObj = new Date(Date.now() + 1000 * 60 * 60 * 24 * offsetDay)
  return localeTimeObj.toUTCString()
}

function Trans2LocaleTime (utcTimeObj: any): string {
  return utcTimeObj.toLocaleString()
}

export { getUTCCurrentTime, getUTCLifeTime, Trans2LocaleTime }
