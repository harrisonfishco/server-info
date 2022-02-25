const express = require('express')
const app = express()
const fs = require('fs')
var path = require('path')
const os = require('os')
const { stringify } = require('querystring')

app.use((req, res, next) => {
    const auth = {login: 'admin', password: 'password'}
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if(login && password && login === auth.login && password === auth.password)
        return next()

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('401')
})
app.use(express.static('public'))
app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile("index.html")
})

app.post('/info', (req, res) => {
    const data = {
        tmem: os.totalmem(),
        fmem: os.freemem(),
        type: os.type(),
        uptime: os.uptime(),
        cpus: os.cpus()
    }
    res.send(JSON.stringify(data))
})

app.listen(8080, () => {
    console.log(`Listening on port ${8080}`)
})