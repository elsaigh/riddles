import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://riddles-api.vercel.app/random')
    res.render('index.ejs', { 
      riddle: response.data.riddle
    })
  } catch (error) {
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})