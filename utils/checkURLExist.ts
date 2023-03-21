import urlExist from 'url-exist'
import { parse } from 'tldts'

async function CheckURLExist (url: string): Promise<boolean> {
  if (url === 'http://' || url === 'https://') {
    return false
  }
  if (parse(url).domain === null) {
    return false
  }
  console.log(parse(url).domain)
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
