import mongoose from "mongoose";

const url='mongodb+srv://lakshaysingh37:Tomatino323@cluster0.d4kzuti.mongodb.net/food-delivery';

export const connetDB=async()=>{
    await mongoose.connect(url)
    .then(()=>console.log("DB Connected!"));
}