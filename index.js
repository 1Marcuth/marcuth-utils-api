const express = require("express")

const scrapingRouter = require("./router/scraping/index.js")

const port = process.env.PORT || 3001
const app = express()

app.use((request, resonse, next) => {
    resonse.setHeader("Access-Control-Allow-Origin", "http://localhost")
    resonse.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    resonse.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    resonse.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())
app.use("/scraping", scrapingRouter)

app.listen(port, () => {
    console.log(`> App listening on: http://localhost:${port}/`)
})