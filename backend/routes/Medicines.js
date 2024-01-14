const express = require('express');
const router = express.Router();
const {Medicines, Users} = require('../models');

// ADD BULONG
router.post("/", async (req, res) => {
  try {
      const { name, quantity, UserId } = req.body;
      const medicines = await Medicines.create({
          name: name,
          quantity: quantity,
          UserId: UserId,
      });
      res.json(medicines);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Get all medicines along with associated user details
router.get('/', async (req, res) => {
    try {
      const medicines = await Medicines.findAll({
        include: { model: Users, as: 'user' }
      });
  
      res.json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
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