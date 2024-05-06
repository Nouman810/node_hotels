const express = require('express')
const router = express.Router()
const Person = require('./../models/person')


//POST route to add a person
router.post('/', async (req, res) => {

    try {
        const data = req.body //asumming the request body contains person data

        //create new person document using mongose model
        const newPerson = new Person(data)

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})



//GET route to all person
router.get('/', async (req, res) => {

    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

//get data according to worktype
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType //extract the worktype from url
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'invalid work type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

//Update person router

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //extract the id from url
        const updatedPersonData = req.body; //updated data for person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated documents
            runValidators: true, //Run mongoose
        })

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

//delete person data

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //extract the id from url
        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted succesfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router