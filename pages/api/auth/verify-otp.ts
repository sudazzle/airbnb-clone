import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const response = await axios.post('http://localhost:4000/auth/verify-otp', req.body)
  
  if (response.data.access_token) {
    console.log('response.data.access_token', response.data)
    const isLocalhost = req.headers.host?.includes('localhost')
    res.setHeader('Set-Cookie', `token=${response.data.access_token}; Path: '/'; HttpOnly: ${!isLocalhost}; Secure: ${!isLocalhost};`)
    res.status(response.status).send('OK')
  }
}
