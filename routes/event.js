const express = require('express')

const router= express.Router()
const Event = require('../models/event')

router.get('/',async(req,res)=>{
    //console.log('Get request')
    try{
        const event= await Event.find()
        res.json(event)

    }catch(err){
        res.send('Error'+err)
    }

})
module.exports = router