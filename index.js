const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();
const RestaurantModel = require("./models/restaurant.models");
const { json } = require("stream/consumers");
const cors = require("cors");
const app = express();

app.use(express.json());

async function createRestaurant(newRestaurant) {
  try {
    const restaurant = new RestaurantModel(newRestaurant);
    const savedRestaurant = await restaurant.save();
    return savedRestaurant;
  } catch (error) {
    throw error;
  }
}


app.post("/restaurant",async(req,res)=>{
  try {
    const savedRestaurant = await createRestaurant(req.body)
    res.status(201).json({
  message: "Restaurant added successfully.",
  restaurant: savedRestaurant
});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"failed to add Restaurant"})
  }
})

//find all restaurant
async function readAllRestaurant() {
  try {
    const allRestaurant = await RestaurantModel.find();
    return allRestaurant;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurant", async (req, res) => {
  try {
    const restaurantList = await readAllRestaurant();
    if (restaurantList.length != 0) {
      res.json(restaurantList);
    } else {
      res.status(401).json({ error: "No restaurant found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Unable to fetch Data" });
  }
});

//finding rest by Name

async function restaurantByName(resName) {
  try {
    const rest = await RestaurantModel.findOne({ name: resName });
    return rest;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const result = await restaurantByName(req.params.restaurantName);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No restaurant found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Data" });
  }
});

async function restaurantByPhoneNumber(resPhoneNumber){
  try {
    const rest = await RestaurantModel.findOne({ phoneNumber: resPhoneNumber });
    return rest;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const result = await restaurantByPhoneNumber(req.params.phoneNumber);
    console.log(JSON.stringify(req.params.phoneNumber))
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No restaurant found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Data" });
  }
});

async function restaurantByCuisineName(resCuisineName){
    try {
        const result = await RestaurantModel.findOne({cuisine:resCuisineName})
        return result;
    } catch (error) {
        throw error
    }
}

app.get("/restaurants/cuisine/:cuisineName",async (req,res)=>{
    try {
        const result = await restaurantByCuisineName(req.params.cuisineName)
        if(result){
            res.json(result)
        }else{
            res.status(404).json({ message: "No restaurant found" });
        }

        
    } catch (error) {
         res.status(500).json({ error: "Unable to fetch Data" });
    }
})

async function restaurantByLocation(resLocation){
    try {
        const result = await RestaurantModel.findOne({location:resLocation})
        
        return result
    } catch (error) {
        throw error
    }
}

// 123 Main Street, Anytown
app.get("/restaurants/location/:restaurantLocation",async(req,res)=>{
    try {
      const result =await restaurantByLocation(req.params.restaurantLocation)
      console.log(JSON.stringify(req.params.restaurantLocation))
       if(result){
            res.json(result)
        }else{
            res.status(404).json({ message: "No restaurant found" });
        }

    } 
    catch (error) {
        res.status(500).json({ error: "Unable to fetch Data" });
    }
})

async function deleteRestaurant(restaurantId) {
try {
  const deletedRestaurant = await RestaurantModel.findByIdAndDelete(restaurantId)
  return deletedRestaurant
  
} catch (error) {
  throw error;
}  
}

app.delete("/restaurants/:restaurantId",async(req,res)=>{
  try {
    const deletedRest = await deleteRestaurant(req.params.restaurantId)
     res.status(200).json({message:"Restaurant deleted successfully."})
  } catch (error) {
     res.status(500).json({ error: "Unable to fetch Data" });
  }
})

async function updateRestaurant(restaurantId,Updatedrestaurants){
  try {
    const updatedRest = await RestaurantModel.findByIdAndUpdate(restaurantId,Updatedrestaurants,{
      new:true
    })
    return updatedRest    
  } catch (error) {
    throw error
  }
}

app.post("/restaurants/:restaurantId",async(req,res)=>{
  try {
    const updatedRest = await updateRestaurant(req.params.restaurantId,req.body)
    if(updatedRest){
      res.status(200).json({message:"Data updated Successfully",updatedRest:updatedRest})
    }
    else{
      res.status(404).json({error:"Unable to update"})
    }
  } catch (error) {
    res.status(500).json({error:"Unable to fetch data"})
  }
})

//683f0bf28a81f79c8edbfd93

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
