//Post apko tabhi dikhegi jab aap logged in ho.
const {success, error}  = require("../utils/responseWrapper");
const Patient = require('../Models/patientDetailsSchema');
// const user = require('../Models/Doctor');
const getAllPatientController = async (req,res)=>{
    console.log(req._id);  //requireUser middleware ne ye id request mai dal di hai..agar hogi to sahi hai agar nahi hogi to gadbad ho jayegi.
}
const createPatientController = async (req,res)=>{
   try{
    const {name,age,weight,description} = req.body;
    const p = Patient.findById(req._id);
    const patient = Patient.create({
        name,
        age,
        weight,
        description
    });
    // user.myPatients.push(patient._id);
    // await user.save();
    return res.send(success(201,patient));
   }
   catch(e){
    res.send(error(500,e.message));
   } 
 }

module.exports = {getAllPatientController,createPatientController}; 