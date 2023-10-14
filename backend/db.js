const mongoose = require('mongoose')

const mongoURI = 'mongodb://0.0.0.0:27017/'        

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI)
    console.log('connected to database')
}


module.exports= connectToMongo;
