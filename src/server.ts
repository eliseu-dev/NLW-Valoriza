import express from "express"

const app = express();
const PATH = "/valoriza"

app.get(PATH + "/test", (req, res) => {
    return res.send("Hello NLW Together")
})
app.post(PATH + "/test-post", (req, res) => {
    return res.send("Hello test post")
})

app.listen(3003, () => console.log("Server is running"))