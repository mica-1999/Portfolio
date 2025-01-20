import dbConnect from '../../config/db';
import User from '../../models/userModel';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find({});
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { userName, password, email, role } = req.body;
    const newUser = new User({ userName, password, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
