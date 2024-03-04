
const {app} = require("./app.js")
const {dbConnect} = require("../src/db/index.js")
const dotenv = require("dotenv")
const cors = require('cors')



dotenv.config({
    path: './.env'
})

dbConnect().then(() => {
    app.on('error', (e) => {
        console.log("Error", e);
        throw e;
    })

    app.listen(3000, () => {
        console.log(`Listening at port 3000`)
    })
}).catch(() => {
    console.log("Error")
});

