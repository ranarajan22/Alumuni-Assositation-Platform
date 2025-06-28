const Alumni = require('../Models/alumuni');

const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({}, '_id fullName graduationYear linkedin profilePhoto fieldOfStudy position');
    res.status(200).json({ alumni });
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ error: 'Failed to retrieve alumni' });
  }
};

module.exports = { getAllAlumni };
