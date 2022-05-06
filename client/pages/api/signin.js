export default function signin(req, res) {
  
  const { username, password } = req.body;

  if (username === 'hello' && password === 'hello') {
    res.status(200).json({ 
      authToken: "lol69"
    })
  } else {
    res.status(200).json({ 
      id: 'jpval'
    })
  }
}