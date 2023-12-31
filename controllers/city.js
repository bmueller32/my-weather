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
    // Use Model to create a document in the posts collection in Mongodb
    const city = await City.create({
      location: req.body.location,
      user: req.user,
    });
    // await city.populate("user"); //populating on a mongoose document! this gives us the user object
    res.status(201).json({ data: city });
  } catch (err) {
    console.log("400");
    res.status(400).json({ error: err });
  }
}

async function index(req, res) {
  try {
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch the posts
    const cities = await City.find({
      user: req.user,
    });
    res.status(200).json({ cities });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function deleteCity(req, res) {
  try {
    const city = await City.findOneAndDelete({
      location: req.params.id,
      user: req.user,
    });

    if (!city) {
      return res
        .status(404)
        .json({
          error: "City not found or you don't have permission to delete it.",
        });
    }

    res.json({ data: "City removed" });
  } catch (err) {
    res.status(400).json({ err });
  }
}
