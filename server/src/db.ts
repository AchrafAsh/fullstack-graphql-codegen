export default {
    posts: [
        {
            id: 0,
            authorId: 0,
            title: "Hello World",
            content: "Hello world. How is it going?",
            createdAt: new Date(),
            publishedAt: new Date(2022, 1, 3),
        },
        {
            id: 1,
            authorId: 0,
            title: "This is a draft",
            content: "No content there yet...",
            createdAt: new Date(),
            publishedAt: null,
        },
    ],
    authors: [
        {
            id: 0,
            displayName: "Achraf ASH",
            picture: "https://thispersondoesnotexist.com/image",
            createdAt: new Date(2022, 1, 1),
        },
    ],
    comments: [
        {
            id: 0,
            postId: 0,
            text: "Nice one!",
            username: "John Doe",
            createdAt: new Date(),
            replyToId: null,
        },
        {
            id: 1,
            postId: 0,
            text: "Appreciate you!",
            username: "Achraf ASH",
            createdAt: new Date(),
            replyToId: 0,
        },
    ],
};
