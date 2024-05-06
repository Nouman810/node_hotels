const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/menuItem')

//POST route to add a menu item
router.post('/', async (req, res) => {

    try {
        const data = req.body //asumming the request body contains person data
        const newMenu = new MenuItem(data)
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

//GET route to all menu
router.get('/', async (req, res) => {

    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

router.get('/:taste', async(req, res)=>{
    try{
        const taste = req.params.taste //extract the worktype from url
        if(taste == 'sweet' || taste == 'spicy'|| taste == 'sour'){
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'invalid taste'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})



module.exports = router