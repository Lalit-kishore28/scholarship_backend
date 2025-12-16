const Scholarship = require('../models/Scholarship');

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().populate('createdBy', 'name email');
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id).populate('createdBy', 'name email');
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create scholarship (Admin only)
exports.createScholarship = async (req, res) => {
  try {
    const { title, description, amount, deadline, eligibility, category, website } = req.body;

    if (!title || !description || !amount || !deadline) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const scholarship = new Scholarship({
      title,
      description,
      amount,
      deadline,
      eligibility,
      category,
      website,
      createdBy: req.user.id,
    });

    await scholarship.save();
    res.status(201).json({ message: 'Scholarship created successfully', scholarship });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update scholarship
exports.updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    if (scholarship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this scholarship' });
    }

    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Scholarship updated successfully', scholarship: updatedScholarship });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete scholarship
exports.deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    if (scholarship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this scholarship' });
    }

    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search scholarships
exports.searchScholarships = async (req, res) => {
  try {
    const { category, minAmount, maxAmount, keyword } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = minAmount;
      if (maxAmount) filter.amount.$lte = maxAmount;
    }
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    const scholarships = await Scholarship.find(filter).populate('createdBy', 'name email');
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
