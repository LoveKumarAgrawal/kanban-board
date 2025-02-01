export type RegisterState = {
    errors?: {
      email?: string[] | string;
      name?: string[];
      password?: string[];
      confirmPassword?: string[];
    };

  };