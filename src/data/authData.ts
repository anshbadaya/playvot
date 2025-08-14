export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// Dummy user data for authentication testing
export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=john_doe',
    role: 'user'
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    password: 'secure456',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=jane_smith',
    role: 'user'
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@playvot.com',
    password: 'admin123',
    name: 'Admin User',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    role: 'admin'
  },
  {
    id: '4',
    username: 'demo_user',
    email: 'demo@playvot.com',
    password: 'demo123',
    name: 'Demo User',
    avatar: 'https://i.pravatar.cc/150?u=demo_user',
    role: 'user'
  },
  {
    id: '5',
    username: 'test_user',
    email: 'test@playvot.com',
    password: 'test123',
    name: 'Test User',
    avatar: 'https://i.pravatar.cc/150?u=test_user',
    role: 'user'
  }
];

// Helper function to find user by username or email
export const findUserByCredentials = (usernameOrEmail: string, password: string): User | null => {
  const user = dummyUsers.find(user => 
    (user.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
     user.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
    user.password === password
  );
  
  return user || null;
};

// Helper function to find user by ID
export const findUserById = (id: string): User | null => {
  return dummyUsers.find(user => user.id === id) || null;
};

// Helper function to validate credentials
export const validateCredentials = (usernameOrEmail: string, password: string): { isValid: boolean; user?: User; error?: string } => {
  if (!usernameOrEmail.trim()) {
    return { isValid: false, error: 'Username or email is required' };
  }
  
  if (!password.trim()) {
    return { isValid: false, error: 'Password is required' };
  }
  
  const user = findUserByCredentials(usernameOrEmail, password);
  
  if (!user) {
    return { isValid: false, error: 'Invalid username/email or password' };
  }
  
  return { isValid: true, user };
};
