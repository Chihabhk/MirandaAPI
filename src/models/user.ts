export interface User {
    id: `${string}-${string}-${string}-${string}-${string}`;
    username: string;
    password: string;
    name?: string;
    email?: string;
    phone?: string;
    role: "admin" | "employee" | "client";
}
