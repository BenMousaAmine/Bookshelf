export interface UserData {
    firstName: string | null;
    lastName: string | null;
    company: string | null;
    position: string | null;
    role: number | null;
    phone: string | null;
    username: string;
    password: string;
}

export interface UserDataSetters {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}
