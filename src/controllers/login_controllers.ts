export function postLogin (req: Request, res: Response) {
  console.log('body', req.body)

  const user = Client.exec('SELECT * FROM user WHERE user.email = ' + req.body.email)

  res.send(`<h1>Coucou ${user.name}</h1>}`)
}


