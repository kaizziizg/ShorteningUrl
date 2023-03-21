import getHash from '../hashGenetator.js'
import { checkProtocol } from '../checkURLExist.js'

class UrlInfo {
  owner: string
  oriUrl: string
  shortUrl: string
  msg: string
  isSuccess: boolean
  clickTime: number
  lifeTime: string
  ogmTitle: string
  ogmDescription: string
  ogmImage: string
  constructor (_owner: string = 'noOwner', _oriUrl: string = '', _shortUrl: string = '', _isSuccess: boolean = false, _msg: string = '', _clickTime: number = 0, _lifeTime: string = '', _ogmTitle: string = '', _ogmDescription: string = '', _ogImage: string = '') {
    this.owner = _owner
    this.oriUrl = checkProtocol(_oriUrl)
    this.shortUrl = _shortUrl
    this.isSuccess = _isSuccess
    this.msg = _msg

    this.clickTime = _clickTime
    this.lifeTime = _lifeTime
    this.ogmTitle = _ogmTitle
    this.ogmDescription = _ogmDescription
    this.ogmImage = _ogImage
  }

  getHash (): void {
    this.shortUrl = getHash(this.oriUrl)
  }
}

export default UrlInfo
