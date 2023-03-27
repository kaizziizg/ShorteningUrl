export default function checkLogin (req: any, res: any, next: any): void {
  let username: string = ''
  if (req.method === 'POST') {
    username = req.body.username ?? ' '
  } else {
    username = req.query.username as string ?? ' '
  }

  if (req.session.user === username && username !== undefined) {
    res.locals.login = true
  } else {
    res.locals.login = false
  }
  next()
}
