import ogs from 'open-graph-scraper'

async function ogmGetter (url: string): Promise<any> {
  let ogmTitle: string = ''
  let ogmDescription: string = ''
  let ogImage: string = ''
  await ogs({ url })
    .then((res: any) => {
      const { error, result, response } = res
      ogmTitle = result.ogTitle ?? ''
      ogmDescription = result.ogDescription ?? ''
      ogImage = result.ogImage.url ?? ''
    }).catch((err) => {
      console.log(err)
    })
  

  return { ogmTitle, ogmDescription, ogImage }
}

export default ogmGetter
