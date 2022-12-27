import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'
import { NextApiRequest, NextApiResponse } from 'next'

// export default NewsletterAPI({
//   provider: siteMetadata.newsletter.provider,
// })

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed dow
  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
        tags: ['newsletter'],
      }),
    })
    console.log(response)
    if (response.status === 200) {
      res.status(200).json({ status: 'success' })
    } else {
      res.status(500).json({ status: 'error' })
    }
  } catch (error) {
    res.status(500).json({ status: 'error' })
  }
}
