// This file simulates backend API calls with delays
const DELAY = 800; // 0.8 seconds delay to show "loading" state

export const mockApi = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject('Invalid email or password');
        }
      }, DELAY);
    });
  },

  register: (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
          reject('User already exists');
        } else {
          const newUser = { name, email, password };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          resolve(newUser);
        }
      }, DELAY);
    });
  },

  getGoals: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const goals = JSON.parse(localStorage.getItem('goals') || '[]');
        resolve(goals);
      }, DELAY);
    });
  },

  addGoal: (goal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const goals = JSON.parse(localStorage.getItem('goals') || '[]');
        const newGoal = { ...goal, id: Date.now(), progress: 0 };
        goals.push(newGoal);
        localStorage.setItem('goals', JSON.stringify(goals));
        resolve(newGoal);
      }, DELAY);
    });
  },

  deleteGoal: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let goals = JSON.parse(localStorage.getItem('goals') || '[]');
        goals = goals.filter(g => g.id !== id);
        localStorage.setItem('goals', JSON.stringify(goals));
        resolve(id);
      }, DELAY); // fast delete
    });
  }
};