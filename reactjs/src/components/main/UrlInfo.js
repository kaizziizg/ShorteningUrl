class UrlInfo {
  constructor(_owner = 'noOwner', _oriUrl = '', _shortUrl = '', _isSuccess = false, _msg = '', _clickTime = 0, _lifeTime = '', _ogmTitle = '', _ogmDescription = '', _ogImage = '') {
    this.owner = _owner;
    this.oriUrl = _oriUrl;
    this.shortUrl = _shortUrl;
    this.isSuccess = _isSuccess;
    this.msg = _msg;

    this.clickTime = _clickTime;
    this.lifeTime = _lifeTime;
    this.ogmTitle = _ogmTitle;
    this.ogmDescription = _ogmDescription;
    this.ogmImage = _ogImage;
  }
}
export default UrlInfo;
