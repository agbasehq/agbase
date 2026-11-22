export interface user {
  user: {
    authLoad: boolean;
    userData: {
      username: string;
      email: string;
      image: string;
      apps: [];
      _id: string;
    };
    authUser: {
      name?: string;
      username: string;
      email: string;
      image: string;
      id: string
    };
  };
}
