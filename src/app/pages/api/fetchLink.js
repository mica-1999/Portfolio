const dbConnect = require('../../utils/dbConnect');
const DashNav = require('../../utils/models/dashnavModel');

export default async function handler(req, res) {
  await dbConnect();

  try {
    const link = await DashNav.findOne({});
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.status(200).json({ link });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch link' });
  }
}
