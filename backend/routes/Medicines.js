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

// // Get user details along with associated medicines
// router.get('/:id/medicines', async (req, res) => {
//     try {
//       const userId = req.params.id;
  
//       // Fetch user details along with associated medicines
//       const userWithMedicines = await Users.findByPk(userId, {
//         include: { model: Medicines, as: 'medicines' }
//       });
  
//       res.json(userWithMedicines);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

module.exports = router;