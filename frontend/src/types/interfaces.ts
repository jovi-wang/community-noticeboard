export interface IAlert {
  id: string;
  alertType: string;
  msg: string;
}

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
}
