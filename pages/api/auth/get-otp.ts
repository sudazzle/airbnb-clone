import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const response = await axios.post('http://localhost:4000/auth/get-otp', req.body)
  res.status(response.status).json(response.data)
}
