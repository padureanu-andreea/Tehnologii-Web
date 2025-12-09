const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const path = require('path') 

const app = express()
app.use(cors())
app.use(express.json())

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
  })
}

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  fullName: Sequelize.STRING,
  type: Sequelize.STRING
})


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.post('/users', async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true })
    console.log(`Server started on port ${PORT}`)
  } catch (e) {
    console.log(e)
  }
})