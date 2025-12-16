const mongoose = require('mongoose');
const User = require('./models/User');
const Scholarship = require('./models/Scholarship');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing scholarships
    await Scholarship.deleteMany({});
    console.log('Cleared existing scholarships');

    // Create or find an admin user
    let adminUser = await User.findOne({ email: 'admin@scholarship.com' });
    if (!adminUser) {
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@scholarship.com',
        password: 'admin123',
        role: 'admin',
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    // Sample scholarships data
    const scholarships = [
      {
        title: 'Merit Excellence Scholarship 2024',
        description: 'Full tuition scholarship for students with exceptional academic records and leadership qualities.',
        amount: 50000,
        deadline: new Date('2025-06-30'),
        eligibility: 'GPA 3.8+, Full-time student, Leadership experience required',
        category: 'merit-based',
        website: 'https://www.meritscholarship.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Tech Innovation Scholarship',
        description: 'Scholarship for students pursuing Computer Science, Engineering, or related tech fields.',
        amount: 35000,
        deadline: new Date('2025-07-15'),
        eligibility: 'Enrolled in tech-related program, 3.5+ GPA',
        category: 'merit-based',
        website: 'https://www.techinnovation.com',
        createdBy: adminUser._id,
      },
      {
        title: 'Financial Need Assistance Fund',
        description: 'Scholarship for deserving students facing financial hardship.',
        amount: 25000,
        deadline: new Date('2025-08-31'),
        eligibility: 'Family income below $50,000/year, Good academic standing',
        category: 'need-based',
        website: 'https://www.financialneed.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Athletic Excellence Award',
        description: 'Scholarship for outstanding athletes in various sports programs.',
        amount: 40000,
        deadline: new Date('2025-05-31'),
        eligibility: 'Active sports participation, 3.0+ GPA',
        category: 'sports',
        website: 'https://www.athleticexcellence.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Creative Arts Scholarship',
        description: 'Supporting talented artists, musicians, and performers.',
        amount: 30000,
        deadline: new Date('2025-09-15'),
        eligibility: 'Portfolio submission required, Arts-related field of study',
        category: 'arts',
        website: 'https://www.creativeartsscholarship.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Women in STEM Scholarship',
        description: 'Empowering women pursuing careers in Science, Technology, Engineering, and Mathematics.',
        amount: 45000,
        deadline: new Date('2025-07-31'),
        eligibility: 'Female student, STEM major, 3.5+ GPA',
        category: 'merit-based',
        website: 'https://www.womenstem.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Community Service Award',
        description: 'Recognition for students demonstrating outstanding community service and social impact.',
        amount: 20000,
        deadline: new Date('2025-08-15'),
        eligibility: 'Minimum 100 hours community service, 3.0+ GPA',
        category: 'other',
        website: 'https://www.communityservice.org',
        createdBy: adminUser._id,
      },
      {
        title: 'International Student Scholarship',
        description: 'Scholarship supporting international students pursuing higher education.',
        amount: 55000,
        deadline: new Date('2025-06-15'),
        eligibility: 'International student status, Valid visa, 3.5+ GPA',
        category: 'merit-based',
        website: 'https://www.internationalscholarship.org',
        createdBy: adminUser._id,
      },
      {
        title: 'Business Leadership Scholarship',
        description: 'For students in business programs demonstrating leadership potential.',
        amount: 38000,
        deadline: new Date('2025-07-20'),
        eligibility: 'Business major, 3.6+ GPA, Leadership experience',
        category: 'merit-based',
        website: 'https://www.businessleadership.org',
        createdBy: adminUser._id,
      },
      {
        title: 'First Generation Scholarship',
        description: 'Supporting students whose parents did not attend college.',
        amount: 28000,
        deadline: new Date('2025-09-01'),
        eligibility: 'First-generation college student, 3.0+ GPA',
        category: 'need-based',
        website: 'https://www.firstgeneration.org',
        createdBy: adminUser._id,
      },
    ];

    // Insert scholarships
    await Scholarship.insertMany(scholarships);
    console.log(`${scholarships.length} sample scholarships added successfully!`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
