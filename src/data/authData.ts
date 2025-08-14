export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// Simple hash function for demo purposes (in production, use proper hashing)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Dummy user data with hashed passwords for better security
export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: simpleHash('password123'),
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=john_doe',
    role: 'user'
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    password: simpleHash('secure456'),
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=jane_smith',
    role: 'user'
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@playvot.com',
    password: simpleHash('admin123'),
    name: 'Admin User',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    role: 'admin'
  },
  {
    id: '4',
    username: 'demo_user',
    email: 'demo@playvot.com',
    password: simpleHash('demo123'),
    name: 'Demo User',
    avatar: 'https://i.pravatar.cc/150?u=demo_user',
    role: 'user'
  },
  {
    id: '5',
    username: 'test_user',
    email: 'test@playvot.com',
    password: simpleHash('test123'),
    name: 'Test User',
    avatar: 'https://i.pravatar.cc/150?u=test_user',
    role: 'user'
  },
  {
    id: '6',
    username: 'zoddz',
    email: 'zoddz@gmail.com',
    password: simpleHash('zodzz@123'),
    name: 'Test User',
    avatar: 'https://i.pravatar.cc/150?u=test_user',
    role: 'user'
  },
];

// Rate limiting simulation
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

const isRateLimited = (identifier: string): boolean => {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);
  
  if (!attempts) return false;
  
  // Reset if lockout period has passed
  if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(identifier);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
};

const recordLoginAttempt = (identifier: string): void => {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: now };
  
  attempts.count += 1;
  attempts.lastAttempt = now;
  
  loginAttempts.set(identifier, attempts);
};

// Helper function to find user by username or email
export const findUserByCredentials = (usernameOrEmail: string, password: string): User | null => {
  const hashedPassword = simpleHash(password);
  
  const user = dummyUsers.find(user => 
    (user.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
     user.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
    user.password === hashedPassword
  );
  
  return user || null;
};

// Helper function to find user by ID
export const findUserById = (id: string): User | null => {
  return dummyUsers.find(user => user.id === id) || null;
};

// Helper function to validate credentials
export const validateCredentials = (usernameOrEmail: string, password: string): { isValid: boolean; user?: User; error?: string } => {
  // Input validation
  if (!usernameOrEmail?.trim()) {
    return { isValid: false, error: 'Username or email is required' };
  }
  
  if (!password?.trim()) {
    return { isValid: false, error: 'Password is required' };
  }
  
  // Rate limiting check
  const identifier = usernameOrEmail.toLowerCase();
  if (isRateLimited(identifier)) {
    return { isValid: false, error: 'Too many login attempts. Please try again later.' };
  }
  
  const user = findUserByCredentials(usernameOrEmail, password);
  
  if (!user) {
    recordLoginAttempt(identifier);
    return { isValid: false, error: 'Invalid username/email or password' };
  }
  
  // Clear failed attempts on successful login
  loginAttempts.delete(identifier);
  
  return { isValid: true, user };
};
