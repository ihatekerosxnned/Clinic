const express = require('express');
const router = express.Router();
const {Faculties, Medicines} = require('../models');

const sequelize = require('../models').sequelize;

// ADD BULONG
router.post("/", async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { firstName, lastName, department, complaint, MedicineId } = req.body;
  
      // Create the student
      const faculties = await Faculties.create({
        firstName,
        lastName,
        department,
        complaint,
        MedicineId
      }, { transaction: t });
  
      // Update the quantity of the medicine
      await Medicines.decrement('quantity', { by: 1, where: { id: MedicineId }, transaction: t });
  
      // Commit the transaction
      await t.commit();
  
      res.json(faculties);
    } catch (error) {
      await t.rollback();
  
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// DISPLAY ALL SHITS MATE GINAGO KA KARON
router.get('/', async (req, res) => {
  try {
      const faculties = await Faculties.findAll({
          include: [{ model: Medicines, as: 'facultiesmed' }]
      });

      res.status(200).json(faculties);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
});

// DISPLAY BY ID
router.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    const faculties = await Faculties.findByPk(id);
    res.json(faculties);
})

// UPDATE BULONG
router.put('/update/:id', async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { firstName, lastName, department, complaint, MedicineId } = req.body;
      const existingStudent = await Faculties.findByPk(req.params.id, { transaction: t });
      if (!existingStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      const existingMedicineId = existingStudent.MedicineId;
  
      // Update the student's complaint
      await existingStudent.update({
        firstName,
        lastName,
        department,
        complaint,
        MedicineId
      }, { transaction: t });
  
      // If MedicineId has changed, update the quantity of the medicines
      if (MedicineId !== existingMedicineId) {
        // Increment the quantity of the previous medicine
        await Medicines.increment('quantity', { by: 1, where: { id: existingMedicineId }, transaction: t });
  
        // Decrement the quantity of the new medicine
        await Medicines.decrement('quantity', { by: 1, where: { id: MedicineId }, transaction: t });
      }
  
      // Commit the transaction
      await t.commit();
  
      res.json({ message: 'Student complaint updated successfully' });
    } catch (error) {
      await t.rollback();
  
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// DELETE BY ID GINAGO AH
router.delete('/:id', async(req,res)=>{
    const id = req.params.id;

    try{
        const faculties = await Faculties.findByPk(id);

        if(faculties){
            await faculties.destroy();
            res.status(204).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router;