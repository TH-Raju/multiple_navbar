export interface ILoggedInUser {
  userProfile: {
    _id: string;
    email: string;
    name: string;
    company: string;
    location: string;
    role: string;
    isPhoneVerified: number;
    isEmailVerified: number;
    date_of_add: number;
    last_updated: number;
    profile_pic: string;
  };
}
