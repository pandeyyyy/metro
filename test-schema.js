const { userSchema } = require('./schemas.js');

// Test valid email
try {
  userSchema.parse({ email: 'test@example.com', password: 'password123' });
  console.log('Valid email: Passed');
} catch (e) {
  console.error('Valid email: Failed', e.errors);
}

// Test invalid email
try {
  userSchema.parse({ email: 'not-an-email', password: 'password123' });
  console.log('Invalid email: Failed');
} catch (e) {
  console.log('Invalid email: Passed', e.errors);
}

// Test missing email
try {
  userSchema.parse({ password: 'password123' });
  console.log('Missing email: Failed');
} catch (e) {
  console.log('Missing email: Passed', e.errors);
}