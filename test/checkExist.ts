import { CheckURLExist, checkProtocol } from '../utils/checkURLExist.js'
import urlExist from 'url-exist'
import { parse } from 'tldts'
let url = 'https://chat.openai.com/chat'
url = checkProtocol(url)

console.log(parse(url).domain !== undefined)
console.log(await urlExist(url))
console.log('=====================================')
url = 'https://npm.runkit.com/url-exist'
console.log(parse(url).domain !== undefined)
console.log(await urlExist(url))

console.log('=====================================')
url = 'abd'
console.log(parse(url).domain !== null)
console.log(await urlExist(url))
