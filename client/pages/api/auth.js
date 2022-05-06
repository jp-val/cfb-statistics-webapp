export default function auth(req, res) {

  const { authToken } = req.body;
  
  if (authToken === 'lol69') {
    res.status(200).json({ 
      authToken: "lol69"
    })
  } else {
    res.status(200).json({ 
      id: 'jpval'
    })
  }
}