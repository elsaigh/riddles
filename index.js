import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

var riddle = { question: '', answer: '' }
async function setRiddle() {
  try {
    const response = await axios.get('https://riddles-api.vercel.app/random')
    riddle.question = response.data.riddle
    riddle.answer = response.data.answer
    console.log(riddle)
  } catch (error) {
    res.status(500)
  }
}

app.get('/', async (req, res) => {
  await setRiddle()
  res.render('index.ejs', 
  { riddle, msg: 'Submit your Answer 👆'
  })
})

app.post('/trial', async (req, res) => {

  if (riddle.answer === req.body.userAnswer) {
    await setRiddle()
    res.render('index.ejs', {
      riddle, msg: 'Right 👍 Great Job 🥳'
    })
  } else {
    res.render('index.ejs', {
      riddle, msg: 'Wrong 👎 Better Luck 😢'
    })
  }
})

app.post('/surrender', async (req, res) => {
  const rightAnswerWas = riddle.answer
  await setRiddle()
  res.render('index.ejs', {
    riddle, msg: ('Right Answer was: ' + rightAnswerWas)
  })
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})