const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const catRoutes = require("./routes/categories");
const editSubjectInCat = require("./routes/eachSubject");
const allSubjectInCat = require("./routes/allSubjects");
const regSubject = require("./routes/admin/regSubject");
const getTutorSubject = require("./routes/tutors/getMySubjects");
const editSubject = require("./routes/tutors/editSubject");
const updelSubject = require("./routes/admin/updelSubject");
const sortedSubject = require("./routes/sortSubject");
const sortedTutors = require("./routes/sortTutors");
const getEachTutor = require("./routes/admin/getEachTutor");
const { notFound } = require("./controllers/notFound");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use('/v1', authRoutes);
app.use('/v1', catRoutes);
app.use('/v1', editSubjectInCat);
app.use('/v1', regSubject);
app.use('/v1', getTutorSubject);
app.use('/v1', editSubject);
app.use('/v1', sortedSubject);
app.use('/v1', sortedTutors);
app.use('/v1', allSubjectInCat);
app.use('/v1', getEachTutor);
app.use('/v1', updelSubject);
app.use(notFound);
mongoose.connect("mongodb+srv://faith:oyetunji123@cluster0-bnqlv.mongodb.net/test?retryWrites=true&w=majority", {dbName: "online-tutor", useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {

    console.log("Database Connected");
    app.listen(5000);
}).catch(err => console.log(err));