import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

//Config local env
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 9001

const corsOptions = {
  origin: process.env.ORIGIN_URL,
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
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.RECEIVER,
    subject: "Contact Form DevChristiaan",
    html: `<div>
        <h2>From: ${name} Email: ${email} Phone: ${phone}</h2>
        <h4>Message: ${message}</h4>
      </div>`
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error " + err);
      res.status(417).send("Unable to send message. Please try again later.")
    } else {
      res.status(200).send({message: "The cyber monkies delivered your email successfully!", info: data});
    }
  });
})

export default app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))