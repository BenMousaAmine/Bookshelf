import { UserData } from "../interface/UserData";

export function save(userData: UserData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function load(): UserData | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) as UserData : null;
}

export function remove() {
    localStorage.removeItem('userData');
}

export function update(userData: UserData) {
    save(userData);
}

export function firstTime() {
    localStorage.setItem('firstTime', 'true');
}

export function loadFirstTime(): string | null {
    return localStorage.getItem('firstTime');
}

export const saveImagePath = (imagePath: string) => {
    localStorage.setItem('userProfileImage', imagePath);
};

export const deleteImagePath = () => {
    localStorage.removeItem('userProfileImage');
};

export const bookProgress = (bookId: string, progress: number) => {
    localStorage.setItem(bookId, progress.toString());
};