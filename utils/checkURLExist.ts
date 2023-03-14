import urlExist from 'url-exist'

async function CheckURLExist (url: string): Promise<boolean> {
  const res: boolean = await urlExist(url)
  return res
}

function checkProtocol (url: string): string {
  const reg = /^(http:\/\/|https:\/\/).*/
  if (reg.test(url)) {
    return url
  }
  return `http://${url}`
}

export { CheckURLExist, checkProtocol }
