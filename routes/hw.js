var express = require('express');
var router = express.Router();
const HW = require('../models/homework')
const GradeDB = require('../models/grades')
const studentDB = require('../models/student')

/* GET homework home page. */
router.get('/', function(req, res) {
    HW.find({}).then(function(result){
     console.log(result)
      res.render('hw', { title:'Homework' , result :result });
    })
});

/* POST Add homework. */
router.post('/addHW', function(req, res, next){
    HW.create(req.body).then(function(homework){
        studentDB.find({}).then(function(students) {
            students.forEach(function(student) {
                let grade = {
                    studentID:student.studentID,
                    studentName:student.studentName,
                    homeworkGrade:'',
                    submitTime:'',
                    homework_uuid:homework._id.toString()
                }

                GradeDB.create(grade).then(function(result) {
                console.log(result)
                })
            })
        })
   })

    res.redirect('/hw')
})


module.exports = router;