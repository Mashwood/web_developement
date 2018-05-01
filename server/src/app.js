let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let pg = require('pg')
const PORT = 3000

let pool = new pg.Pool({
  port: 5432,
  password: 'Cricket3189311520#',
  database: 'countries',
  max: 10,
  host: 'localhost',
  user: 'postgres'
})
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(morgan('dev'))

app.use(function (request, respond, next) {
  respond.header('Access-Control-Allow-Origin', '*')
  respond.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/api', function (request, response) {
  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err)
    } else {
      db.query('SELECT * from country', (err, table) => {
        if (err) {
          return console.log(err)
        } else {
          console.log(table)
        }
        console.log(table.rows)
        response.send(table.rows)
        done()
      })
    }
  })
})

app.listen(PORT, () => console.log('listening' + PORT))
