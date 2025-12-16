const express = require('express');
const {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  searchScholarships,
} = require('../controllers/scholarshipController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllScholarships);
router.get('/search', searchScholarships);
router.get('/:id', getScholarshipById);
router.post('/', auth, createScholarship);
router.put('/:id', auth, updateScholarship);
router.delete('/:id', auth, deleteScholarship);

module.exports = router;
