const User = require("../models/User");
class UsersController {
  getAll = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ data: users});
  };

  pagination = async (req, res) => {
const page = req._page;
const limit = req._limit;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const Pages = Math.ceil(total / limit);

    const data = await User
    .find()
    .limit(limit)
    .skip(skip);

    const isNext = page < Pages;
    const isPrev = page > 1;

    res.status(200).json({ total, Pages, data, isNext, isPrev });

  };

  test = async (req, res) => {
    // const count = await User.countDocuments();
    // res.status(200).json({ data: count })
    // const users = await User
    // .find()
    // .select("username")


      const users = await User.find().select("age -_id").where("age").gte(30);
      const user = await User.findByAge(30);

      fn();
      res.status(200).json({ data: users });

  };

  getById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) return res.status(404).json("This user Not found");
    const skills = await user.skillsCount();

    res.status(200).json({ data: user, skills  });
  };

  add = async (req, res) => {
    const { username, age, email, skills, address } = req.body;

    const user = await User.create({
      username,
      age,
      email,
      skills,
      address,
      active: true,
    });

    res.status(201).json({ data: user });
  };

  update = async (req, res) => {
    const { username, age, email, skills, address } = req.body;

    const id = req.params.id;

    const user = await User.findByIdAndUpdate(
      id,
      { username, age, email, skills, address },
      { new: true },
    );

    if (!user) return res.status(404).json("This user not found");

    res.status(201).json({ data: user });
  };

  remove = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({ data: null });
  };
}

module.exports = new UsersController();
