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

// DISPLAY BY ID
router.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    const medicines = await Medicines.findByPk(id);
    res.json(medicines);
})

// UPDATE BY ID GINAGO LIWAT DA AH NA TUYO KANA BALA
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, quantity, role } = req.body;

    try {
        const medicines = await Medicines.findByPk(id);

        if (medicines) {
            medicines.name = name;
            medicines.quantity = quantity;

            await medicines.save();

            res.status(200).json(medicines);
        } else {
            return res.status(404).json({ error: "Error updating yot ginago" });
        }
    } catch (error) {
        console.log("error updating user", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// DELETE BY ID GINAGO AH
router.delete('/:id', async(req,res)=>{
    const id = req.params.id;

    try{
        const medicines = await Medicines.findByPk(id);

        if(medicines){
            await medicines.destroy();
            res.status(204).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router;