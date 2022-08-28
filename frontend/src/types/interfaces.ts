export interface IProfile {
  profileId: string;
  avatar: string;
  name: string;
  hobbies: string;
  role: string;
  bio: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}
export interface IPost {
  postId: string;
  profileId: string;
  text: string;
  name: string;
  avatar: string;
  date: string;
  alowDelete?: boolean;
}

export interface IUser {
  name?: string;
  email: string;
  password?: string;
  token?: string;
  error?: string;
  profileId?: string;
}

export interface IError {
  response?: {
    data: {
      message: string;
    };
  };
  message?: string;
}
