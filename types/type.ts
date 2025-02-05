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

export interface Task {
  id: string;
  name: string;
  status: string;
}


export interface IBoard {
    id: string;
    name: string;
    tasks: Task[]
}
