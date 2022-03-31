import db from "./db";

export type Context = {
    db: {
        posts: {
            id: number;
            authorId: number;
            title: string;
            content: string;
            createdAt: Date;
            publishedAt: Date | null;
        }[];
        authors: {
            id: number;
            displayName: string;
            picture: string;
            createdAt: Date;
        }[];
        comments: {
            id: number;
            postId: number;
            text: string;
            username: string;
            createdAt: Date;
            replyToId?: number;
        }[];
    };
};

export const createContext = () => db;
