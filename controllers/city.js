const City = require("../models/city");

module.exports = {
    create,
    index,
    deleteCity
}



 async function create(req,res){
console.log(req.body)
    try{
        // Use our Model to create a document in the posts collection in Mongodb
        const city = await City.create({
            location: req.body.location,
            user: req.user
        });
        await city.populate("user");//populating on a mongoose document! this gives us the user object
        res.status(201).json({ data: city });
    }catch(err) {
        res.status(400).json({ error: err });
    }
}

async function index(req, res) {
    try{
         // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch the posts
    const cities = await City.find({}).populate("user").exec();
    res.status(200).json({ cities });
    } catch (err) {}
}


async function deleteCity(req,res){
    try{
        const city = await City.findOne({'city._id': req.params.id, 'username': req.username });
        city.remove(req.params.id)// req.params.id is the city id
        await city.save()// after you mutate a document you must save
        res.json({data: ' city removed'})
    } catch(err){
        res.status(400).json({err})
    }
}