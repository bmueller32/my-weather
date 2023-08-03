const Card = require("../models/card");

module.exports = {
    create,
    index,
    deleteCard
}



 async function create(req,res){

    try{
        // Use our Model to create a document in the posts collection in Mongodb
        const card = await Card.create({
            location: req.body.location,
            user: req.user
        });
        await card.populate("user");//populating on a mongoose document! this gives us the user object
        res.status(201).json({ data: card });
    }catch(err) {
        res.status(400).json({ error: err });
    }
}

async function index(req, res) {
    try{
         // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch the posts
    const cards = await Card.find({}).populate("user").exec();
    res.status(200).json({ cards });
    } catch (err) {}
}


async function deleteCard(req,res){
    try{
        const card = await Card.findOne({'cards._id': req.params.id, 'username': req.username });
        card.remove(req.params.id)// req.params.id is the card id
        await card.save()// after you mutate a document you must save
        res.json({data: ' card removed'})
    } catch(err){
        res.status(400).json({err})
    }
}