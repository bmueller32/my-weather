const City = require("../models/city");

module.exports = {
  create,
  index,
  deleteCity,
};

async function create(req, res) {
  
  console.log(req.body);
  try {
    // if (!req.body.data)
    // return res.status(400).json({ error: "no data" });
    // Use our Model to create a document in the posts collection in Mongodb
    const city = await City.create({
      location: req.body.location,
      user: req.user,
    });
    // await city.populate("user"); //populating on a mongoose document! this gives us the user object
    res.status(201).json({ data: city });
  } catch (err) {
    console.log('400')
    res.status(400).json({ error: err });
  }
}

async function index(req, res) {
  try {
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch the posts
    const cities = await City.find({});
    res.status(200).json({ cities });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function deleteCity(req, res) {
  try {
    console.log(req.user)
    const city = await City.findOne({
        
      "city._id": req.params.id,
      user: req.user
    });
    city.remove(req.params.id); // req.params.id is the city id
    await city.save(); // after you mutate a document you must save
    res.json({ data: " city removed" });
  } catch (err) {
    res.status(400).json({ err });
  }
}
