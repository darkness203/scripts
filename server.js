const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Bitpay = require("bitpay-node")
const Client = new Bitpay.Client({ "apiKey": process.env.BITPAY_API_KEY })
const scripts = require("./public/scripts.json")
const getScript = script => scripts.find(e => e.id === script)

app.use(bodyParser.json())
app.use(express.static("public"))

app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`))

app.post("/buy", (req, res) => {
    switch(req.query.script) {
        case "goldgenerator":
            Client.createInvoice({
                "price": getScript("goldgenerator").price,
                "currency": "BTC",
                "transactionSpeed": "high",
                "fullNotifications": true
            }, (err, invoice) => {
                console.log(invoice)
            })

            res.status(200)
            res.send("Buying the script...")
            break
        default:
            res.status(400)
            res.send("Unknown script. Please try again.")
    }
})

app.listen(8080, () => console.log("Listening on port 8080"))