const express = require('express')
const app = express()
const fs = require('fs')
var path = require('path')
const os = require('os')

class GraphData {
    data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    GraphData() {
        for(var i = 0; i < 10; ++i)
            this.data[i] = 0
    }

    addPoint(usage) {
        for(var i = 9; i >= 0; --i)
            this.data[i] = this.data[i - 1]
        this.data[0] = usage
    }

    print() {
        var str = ""
        for(var i = 0; i < 10; ++i)
            str += `${this.data[i].toFixed(2)} `
        console.log(str)
    }
}

const gd = new GraphData()

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
    var data = {
        tmem: os.totalmem(),
        fmem: os.freemem(),
        type: os.type(),
        uptime: os.uptime(),
        cpus: os.cpus()
    }
    gd.addPoint((data.tmem - data.fmem) / data.tmem)
    gd.print()
    data.gd = gd.data
    res.send(JSON.stringify(data))
})

app.listen(8080, () => {
    console.log(`Listening on port ${8080}`)
})