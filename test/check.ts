import urlExist from 'url-exist'

urlExist('http://www.google.com').then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
