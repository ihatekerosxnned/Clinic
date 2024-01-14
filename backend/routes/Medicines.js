const express = require('express');
const router = express.Router();
const {Medicines} = require('../models');

// ADD BULONG
router.post("/", async (req, res) => {
  try {
      const { name, quantity} = req.body;
      const medicines = await Medicines.create({
          name: name,
          quantity: quantity,
      });
      res.json(medicines);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// DISPLAY ALL SHITS MATE GINAGO KA KARON
router.get('/', async(req,res)=>{
  try{
      const medicines = await Medicines.findAll();
      res.status(200).json(medicines)
  }catch(error){
      console.log(error);
      res.status(500).json({error:error.message})
  }
});

module.exports = router;