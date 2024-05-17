// authService.js
const authService = {
  login: async (username, password) => {
    // Simulate authentication logic here
    if (username === 'admin' && password === 'admin') {
      // Simulate successful login
      console.log('Logged in successfully');
      return Promise.resolve();
    } else {
      // Simulate failed login
      console.log('Invalid credentials');
      return Promise.reject(new Error('Invalid credentials'));
    }
  },
};

export default authService;
