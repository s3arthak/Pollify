const express = require('express');
const Poll = require('../models/Poll'); 
const User = require('../models/User'); 

const router = express.Router();

router.post('/create', async (req, res) => {
    const { question, options } = req.body;


    if (!question || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ error: 'Poll must have a question and at least two options' });
    }

    try {
      
        const poll = new Poll({
            question,
            options: options.map(option => ({ text: option, votes: 0 })) // Corrected field name: 'votes'
        });

        
        await poll.save();

      
        res.status(201).json({ message: 'Poll created successfully', poll });
    } catch (error) {
        console.error(error);
      
        res.status(500).json({ error: 'Error creating poll' });
    }
})

router.get('/', async(req, res)=>{
   try{
      const polls =await Poll.find();
      res.status(200).json(polls);
   }
   catch(error){
      console.error(error)
   }
})

router.get('/:id', async(req, res)=>{
   try{
      const poll=await Poll.findById(req.params.id);
      if(!poll){
         return res.status(404).json({error:'Poll not found'})
      }
      res.status(200).json(poll);

   }
   catch(error){
      console.error(error)
   }
})
router.post('/:id/vote', async(req, res)=>{
   const {userId, optionIndex}=req.body;
   if(optionIndex===undefined){
      return res.status(400).json({error:'Option index is required'})
   }

   try{
      const poll=await Poll.findById(req.params.id);
      const user=await User.findById(userId)

      if(!poll){
          return res.status(404).json({error:'Poll not found'})
      }
      if(user.votedPolls.includes(poll._id)){
          return res.status(400).json({message :'User have already voted'})
      }

      if(optionIndex < 0   || optionIndex >=poll.options.length){
          return res.status(400).json({error:' Invalid option index'})
      }

      poll.options[optionIndex].votes+=1;
      await poll.save();
      user.votedPolls.push(poll._id)
      await user.save();

      res.status(200).json({ message: 'Vote recorded' });
      
   }
   catch(error){
       console.log("Error voting", error)
   }
})
module.exports = router;
