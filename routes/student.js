// import {Student} from "../models/student";
const express = require('express')

const router= express.Router()
const {Student} = require('../models/student')

router.get('/',async(req,res)=>{
    //console.log('Get request')
    try{
        const student= await Student.find()
        res.json(student)

    }catch(err){
        res.send('Error'+err)
    }

})


router.get('/:id',async(req,res)=>{
    //console.log('Get request')
    try{
        const student= await Student.findById(req.params.id)
        res.json(student)

    }catch(err){
        res.send('Error'+err)
    }

})



router.post('/',async(req,res)=>{
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        guardian: req.body.guardian
    })

    try{
        const s1=await student.save()
        res.json(s1)        
    }catch(err){
        res.send('Error'+err)
    }

})

router.patch('/:id',async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        /* student.firstName= req.body.firstName
        student.lastName= req.body.lastName
        student.groupID=req.body.groupID
        student.attendanceID=req.body.attendanceID
        student.password= req.body.password
        student.username= req.body.username
        student.semester= req.body.semester
        student.email= req.body.email
        student.phone= req.body.phone */
        
        student.firstName= req.body.firstName

        student.address = req.body.address


        
        const s1=await student.save()
        res.json(s1)

    }catch(err){
        res.send('Error')
    }
})
module.exports = router