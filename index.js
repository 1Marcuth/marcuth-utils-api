const express = require("express")
const cors = require("cors")

const scrapingRouter = require("./router/scraping/index.js")

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/scraping", scrapingRouter)

app.listen(port, () => {
    console.log(`> App listening on: http://localhost:${port}/`)
})