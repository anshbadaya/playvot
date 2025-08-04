export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  errors: {
    username?: string;
    password?: string;
  };
  onFieldChange: (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldBlur: (field: 'username' | 'password') => () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export interface LoginBackgroundProps {
  children: React.ReactNode;
}

export interface LoginHeaderProps {
  onSkip: () => void;
} 