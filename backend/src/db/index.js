const mongoose  = require("mongoose")

exports.dbConnect = async() => {
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URL);

        console.log(instance.connection.host)
    } catch (error) {
        console.log("There is an Error ", error)
        process.exit(1);
    }
}

