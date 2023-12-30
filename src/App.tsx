
import './App.css'

import * as React from "react";
import {useEffect, useState} from "react";
import axios from 'axios'

interface Customer{

    description:string
    image:string,

}

const App:React.FC=()=> {
        const[image,setImage]=useState("")
        const[description,setDescription]=useState('')


    const [customers,setCustomers]=useState<Customer[]>([])

    // const url='http://localhost:8080/save-image'

    const handleImage=async (e)=> {
        const file=e.target.files[0]
       const base64=await convertBase64(file)
        console.log(typeof base64)
        setImage(base64)
    }
    const saveData= async ()=>{
        console.log(image,description)
     try{
        await  axios.post('http://localhost:8080/save-image',{
            image,description
        })
      }catch (e){
          console.log(e)
      }
    }
    useEffect(()=>{
        findData()
    },[])

    const findData = async () => {
   const response = await  axios.get('http://localhost:8080/all-data')
        setCustomers(response.data)
    }

    console.log(customers)

    function convertBase64(file) {
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload=()=>{
                resolve(fileReader.result)
            };
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })

    }

  return (
    <div>
        <h1 className={"text-center"}>React App</h1>
        <br/>
        <div className="container">
            <div className={"row"}>
                <div className="col-12 col-sm-6 col-md-4">
                    <input type="file" className={"form-control"} onChange={
                        (e)=>handleImage(e)}/>
                </div>

                <div className="col-12 col-sm-6 col-md-4">
                    <input type="text" className={"form-control"} onChange={
                        (e)=>{
                            setDescription(e.target.value)
                        }}/>
                </div>

                {
                    customers.map((data,index)=>{
                        return   <div className="col-12 col-sm-6 col-md-4">
                            <img src={data.image} alt="" style={{width:'100px',height:'100px'}}/>
                        </div>
                    })
                }



                <div className="col-12 col-sm-6 col-md-4">
                    <button className={"btn btn-primary"} onClick={saveData}>Save</button>
                </div>


            </div>
    </div>

    </div>

  )
}

export default App
