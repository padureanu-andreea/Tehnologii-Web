const express = require("express")
const departmentsRouter = require("./routes/departments")
const statusRouter = require("./routes/status")
require("dotenv").config()

const app = express()

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use("/api", departmentsRouter)
app.use("/status", statusRouter)

app.get('/force-error', (req, res) => {
    throw new Error('Aceasta este o eroare provocata intentionat!')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    next(err)
})

app.set("port", process.env.PORT || 7000)

app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`)
})