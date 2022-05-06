// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default function appoll(req, res) {
  
  res.status(200).json({ 
    name: 'AP Poll',
    year: 2021,
    week: 12,
    ranking: ['Alabama', 'Ohio State', 'Clemson', 'Oklahoma', 'Georgia', 'Notre Dame', 'Wisconsin', 'LSU', 'Penn State', 'Michigan', 'Flroida', 'Oregon']
  })
}