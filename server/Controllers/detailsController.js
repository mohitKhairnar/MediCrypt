// detailsController.js
const details = require('../Models/patientDetailsSchema');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const multer = require('multer');
const fs=require('fs')
const { log } = require('console');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  const iv = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log("Hello I am in the storage  ..........");
      cb(null, "local_storage/temp");
    }
    catch (err) {
      console.log("Error while Uploading")
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname
    );
  }
});

const maxSize = 25 * 1024 * 1024; //25Mb size

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      console.log('report-error', "Report should be in .pdf or .docx format");

      cb(null, false);
    }
  },
  limits: { fileSize: maxSize },
});

var multipleUpload = upload.fields([
  { name: "fileSave", maxCount: 5 },
]);


exports.detailsSave = async (req, res) => {
  try {
    await multipleUpload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'File upload error' });
      }

      console.log("Hello World");
      console.log(req.files);

      // rest of your code goes here...
    var pid = "";
    if (req.body.pname != null || req.body.pname != "" || req.body != 0)
      pid = (req.body.pname) + Math.floor(Math.random() * 100) + 1 + (req.body.age);

    const path = `local_storage/${pid}/reports/`
    // var fileSavepath = `${pid}/${pdfog}`
    console.log(path);
      fs.access(path, (error) => {
      if (error) {
        // If current directory does not exist then create it
         fs.mkdir(path, { recursive: true }, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Creating folders");
            fs.readdirSync('local_storage/temp').forEach(file => {
              fs.renameSync('local_storage/temp/' + file, path+ file)
            })
          }
        })
      }
      else {
        console.log("Given Directory already exists !!");
        fs.readdirSync('local_storage/temp').forEach(file => {
          fs.renameSync('local_storage/temp/' + file, path + file)
        })
      }
    })
    

// console.log(files);
    console.log("Files in details ..............................");
    var filesData=[]
    for (let i = 0; i < req.files.fileSave.length; i++) {
      filesData.push(req.files.fileSave[i].path)
      }

    console.log(filesData);
    await details.create({
      patientId: pid,
      patientName: req.body.pname,
      patientAge: req.body.age,
      patientWeight: req.body.weight,
      description: req.body.desc,
      medicines: req.body.prescription,
      tests: req.body.tests,
      email: req.body.email,
      reports:filesData
    });
    res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.detailsFetch = async (req, res) => {
    console.log("Within detaisl Fetch");
    // const data = await details.findAll({});
    // console.log(data);
    // res.json(data);
    // const collection = db.collection('details');
    // collection.find({}).toArray(function(err, docs) {
    // if (err) throw err;
    // res.send(docs);
//   });
const data = await details.find({});
console.log(data);
res.json(data);
}
