type User = { email: string; password: string; resetToken?: string };

const users: { [key: string]: User } = {
  'user@example.com': { email: 'user@example.com', password: 'hashed_password' },
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
 // users = await User.find({email});
  return users[email] || null;
};

export const saveResetToken = async (email: string, resetToken: string): Promise<void> => {
  if (users[email]) {
    users[email].resetToken = resetToken;
  }
};

export const updateUserPassword = async (email: string, password: string): Promise<void> => {
  if (users[email]) {
    users[email].password = password;
    delete users[email].resetToken;
  }
};
