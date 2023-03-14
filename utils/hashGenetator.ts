import murmurhash from 'murmurhash'
const seed: number = 1129
const lowBound: number = Math.pow(62, 5)
const upperBound: number = Math.pow(62, 6) - 1

const base: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const baseLength: number = base.length

function getHash (url: string): string {
  // To avoid hash collision & make sure the hash is in the expected range, every hashing will add time to the URL.
  let hashID: number = 0
  while (hashID < lowBound || hashID > upperBound) {
    hashID = murmurhash.v3(url + String(Date.now()), seed)
  }
  return DECto62Base(hashID)
}

function DECto62Base (num: number): string {
  const res = []
  while (num > 0) {
    res.push(base[num % baseLength])
    num = Math.floor(num / baseLength)
  }
  return res.join('')
}

export default getHash
