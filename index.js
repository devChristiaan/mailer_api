import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

//Config local env
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 9001

const corsOptions = {
  origin: "*",
  methods: ['POST']
}

app.use(cors(corsOptions))
app.use(express.json())

app.post('/api/v1/mailer', (req, res)=>{

  const {name, email, phone, message } = req.body

  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: name,
    to: process.env.RECEIVER,
    subject: "Contact Form DevChristiaan",
    text: (
      <div>
        <h1>From: {name}</h1>
        <h2>Email: {email}</h2>
        <p>Phone: {phone}</p>
        <p>Message: {message}</p>
      </div>
    )
  };
})

export default app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))