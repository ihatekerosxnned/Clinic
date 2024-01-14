const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const userRouter = require('./routes/Users');
app.use('/users', userRouter);

const medicinesRouter = require('./routes/Medicines');
app.use('/medicines', medicinesRouter);

const studentsRouter = require('./routes/Students');
app.use('/students', studentsRouter)

db.sequelize.sync().then(()=>{
    app.listen(8080, ()=>{
        console.log("Server running on post 8080")
    });
});



