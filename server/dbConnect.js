const mongoose = require('mongoose');

module.exports = async()=>{
    const mongoUrl = "mongodb+srv://mohitkhairnar9486:Ar8sux7JC4CES39N@cluster0.0d7uivj.mongodb.net/?retryWrites=true&w=majority";
    try{
        const connect = await mongoose.connect(mongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected Successfully");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}