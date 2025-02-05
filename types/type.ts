export type RegisterState = {
    errors?: {
      email?: string[] | string;
      name?: string[];
      password?: string[];
      confirmPassword?: string[];
    };

  };

  export interface SessionPayload {
    id: string;
    name: string;
    expiresAt: Date;
    [key: string]: any;
  }