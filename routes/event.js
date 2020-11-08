const express = require('express')

const router= express.Router()
const {Event} = require('../models/event')
const {Milestone} = require('../models/event')

router.get('/',async(req,res)=>{
    console.log('Get request')
    try{
        const event= await Event.find()
        res.json(event)

    }catch(err){
        res.send('Error'+err)
    }

})

router.get('/:id',async(req,res)=>{
    //console.log('Get request')
    try{
        const event= await Event.findById(req.params.id)
        res.json(event)

    }catch(err){
        res.send('Error'+err)
    }

})


router.get('/milestone',async(req,res)=>{
    console.log('Get milestone request')
    try{
        const milestone= await Milestone.find()
        res.json(milestone)

    }catch(err){
        res.send('Error'+err)
    }

})

router.post('/',async(req,res)=>{
    const event = new Event({
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        eventDate: req.body.eventDate,
        eventDescription: req.body.eventDescription
    })

    try{
        const s1=await event.save()
        res.json(s1)        
    }catch(err){
        res.send('Error'+err)
    }

})

router.post('/milestone',async(req,res)=>{
    const milestone = new Milestone({
        milestoneName: req.body.milestoneName,
        milestoneIsCompleted: req.body.milestoneIsCompleted
    })

    try{
        const s1=await milestone.save()
        res.json(s1)        
    }catch(err){
        res.send('Error'+err)
    }

})

router.put('/:id',async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id)
        event.eventName= req.body.eventName
        event.eventType= req.body.eventType
        event.eventDate= req.body.eventDate
        event.eventDescription= req.body.eventDescription
        event.addeventMilestones= req.body.addeventMilestones
        const e1=await event.save()
        res.json(e1)

    }catch(err){
        res.send('Error'+err)
    }
})
module.exports = router