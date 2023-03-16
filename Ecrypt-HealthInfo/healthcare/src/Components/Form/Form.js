import React, { useState, useEffect } from "react";
import "./Form.css";
import image from "./hospitalLogo.png";
import { Button, message, Upload, Space, Typography } from "antd";
import { FaMobileAlt } from "react-icons/fa";
function Form() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    //By using setTimeInterval we are able to get the current time of system..And even updating time.
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [inputList, setinputList] = useState([{ firstName: "", lastName: "" }]);
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };
  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };
  const handleaddclick = () => {
    setinputList([...inputList, { firstName: "", lastName: "" }]);
  };

  //Medical Checkup
  const [tests, setTests] = useState([]);
  const [curTest, setcurTest] = useState("");

  function updateCurTest(event) {
    setcurTest(event.target.value);
  }

  function addTest(event) {
    const newTestArray = [...tests, curTest];
    setTests(newTestArray);
  }

  //Adding multiple files
  const [doc, setdoc] = useState([""]);

  const [files, setFiles] = useState({});
  const axios = require("axios");
  function handleFileUpload({ file }) {
    setFiles((pre) => {
      return { ...pre, [file.uid]: file };
    });
    axios.post("http://localhost:3000/fileUpload", file, {
      onUploadProgress: (event) => {
        console.log(event);
      },
    });
  }

  //handling submit button of form
  const [name,setName] = useState('');
  function handleSubmit(e){
    e.preventDefault();
    console.log(name);
    console.log("handling submit button of form");
  }



  return (
    <div className="formContainer">
      <div className="formHeader">
        <div className="leftWala">
          <div className="leftHeader">
            <img src={image} alt="Hospital Logo" />
          </div>
          <div className="rightHeader">
            <h1 style={{ fontSize: "5rem", color: "#22385f" }}>KIHS</h1>
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
              KULLOLLI INSTITUTE OF HEALTH SERVICES
            </p>
          </div>
        </div>
        <div className="rightWala">
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            Dr.Mohit Khairnar
          </p>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            MD MS In Medicine
          </p>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>From America</p>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            Place: Sangli, Maharashtra
          </p>
        </div>
        {/* <img src={header} alt="" /> */}
      </div>
      <hr className="breaker" />
      <form>
        <div className="formBody">
          <div className="dateAndTime">
            <h4>Date: {date}</h4>
            <h4>Time: {time.toLocaleTimeString()}</h4>
          </div>
          <div className="nameAgeWeight">
            <div className="formInputWala">
              <h4>Name</h4>
              <input type="text" style={{ width: "500px" }} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="formInputWala">
              <h4>Age</h4>
              <input type="number" style={{ width: "200px" }} />
            </div>
            <div className="formInputWala">
              <h4>Weight</h4>
              <input type="number" style={{ width: "200px" }} />
            </div>
          </div>
          <div className="description">
            <h4>Description</h4>
            <textarea name="postContent" rows={4} />
          </div>
          <div className="medicines">
            <h4>Medicine</h4>
            <div className="allMedicines">
              {inputList.map((x, i) => {
                return (
                  <div className="singleMedicine">
                    <div class="medicineName">
                      <h4>Medine Name</h4>
                      <input
                        type="text"
                        name="firstName"
                        class="medicineInput"
                        placeholder="Enter Medicine Name"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineQuantity">
                      <h4>Medicine Quantity</h4>
                      <input
                        type="number"
                        name="medicineQuantity"
                        class="medicineInput"
                        placeholder="Enter Medicine Quantity"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineTime">
                      <h4>Time For Medicine</h4>
                      <input
                        type="text"
                        name="medicineTime"
                        class="medicineInput"
                        placeholder="Enter Time for Medicine"
                        onChange={(e) => handleinputchange(e, i)}
                      />
                    </div>
                    <div class="medicineButtons">
                      {inputList.length !== 1 && (
                        <button
                          className="medicineRemove"
                          onClick={() => handleremove(i)}
                        >
                          <h4>Remove</h4>
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button
                          className="medicineAdd"
                          onClick={handleaddclick}
                        >
                          <h4>Add More</h4>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>  
          </div>
          <div className="requiredMedicalCheckups">
            <h4>Required Medical Checkups</h4>
            <div
              style={{
                border: "2px solid black",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px 0px rgba(154, 183, 216, 0.5)",
                padding: "20px",
              }}
            >
              <input
                className="testInput"
                onChange={updateCurTest}
                type="text"
                placeholder="Enter Test Name"
              />
              <button onClick={addTest}>
                <h4>Submit</h4>
              </button>
              <div className="allTests">
                {tests.map((test, index) => {
                  return (
                    <div className="test" key={index}>
                      <h4>{test}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="addingDocuments">
            <h4>Upload Medical Reports</h4>
            {
              <div
                style={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  boxShadow: "0px 5px 10px 0px rgba(154, 183, 216, 0.5)",
                  padding: "20px",
                }}
              >
                <button
                  onClick={() => {
                    setdoc([...doc, ""]);
                  }}
                >
                  <h4>ADD REPORT</h4>
                </button>
                {doc.map((item, index) => {
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label htmlFor="fileID">Upload the file</label>
                      <input
                        type="file"
                        id="fileID"
                        value={item}
                        style={{ border: "2px solid black" }}
                      />
                      <button
                        onClick={() => {
                          const newarr = doc.filter((i, j) => {
                            return index !== j;
                          });
                          console.log(newarr);
                          setdoc(newarr);
                        }}
                      >
                        <h4>DELETE</h4>
                      </button>
                    </div>
                  );
                })}
              </div>
            }
          </div>
          <div className="submitFormButton">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;


// AES is considered a very secure encryption algorithm and is widely used in various applications, including online banking, email encryption, and secure file transfer. It has been standardized by the National Institute of Standards and Technology (NIST) and is approved by the US government for protecting classified information up to the level of "Top Secret".
