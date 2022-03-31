import type {
    Author,
    Post,
    Comment,
    CreateCommentInput,
    QueryAuthorArgs,
    QueryPostArgs,
    MutationPublishPostArgs,
    MutationCreateCommentArgs,
    MutationCreatePostArgs,
    CommentResolvers,
} from "./generated";
import type { Context } from "./context";
const { GraphQLScalarType, Kind } = require("graphql");

const resolvers = {
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "Date custom scalar type",
        serialize(value: Date) {
            return value.getTime(); // Convert outgoing Date to integer for JSON
        },
        parseValue(value: number) {
            return new Date(value); // Convert incoming integer to Date
        },
        parseLiteral(ast: typeof Kind) {
            if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
            }
            return null; // Invalid hard-coded value (not an integer)
        },
    }),

    Author: {
        posts: ({ id }: Author, _args: null, ctx: Context) => {
            return ctx.db.posts.filter((p) => p.authorId === id);
        },
    },
    Post: {
        author: ({ author: { id } }: Post, _args: null, ctx: Context) => {
            return ctx.db.authors.filter((author) => author.id === id)[0];
        },
        comments: ({ id }: Post, _args: never, ctx: Context) => {
            return ctx.db.comments.filter((comment) => comment.postId === id);
        },
    },

    Comment: {
        replyTo: (
            { replyToId }: { replyToId: number },
            _args: null,
            ctx: Context
        ) => {
            if (typeof replyToId !== "number") return null;

            const matchedComment = ctx.db.comments.filter(
                (comment) => comment.id === replyToId
            );
            return matchedComment.length > 0 ? matchedComment[0] : null;
        },
    },

    Query: {
        author: (_parent: null, { id }: QueryAuthorArgs, context: Context) => {
            const matchedAuthors = context.db.authors.filter(
                (el) => el.id === id
            );
            return matchedAuthors.length > 0 ? matchedAuthors[0] : null;
        },
        post: (_parent: null, { id }: QueryPostArgs, context: Context) => {
            const matchedPosts = context.db.posts.filter((el) => el.id === id);
            return matchedPosts.length > 0 ? matchedPosts[0] : null;
        },
        allPosts: (_parent: null, _args: null, ctx: Context) => {
            // returns only the published posts
            return ctx.db.posts.filter((p) => p.publishedAt !== null);
        },
    },

    Mutation: {
        createPost: (
            _parent: null,
            { input }: MutationCreatePostArgs,
            ctx: Context
        ) => {
            const id = ctx.db.posts.length;
            ctx.db.posts.push({
                id,
                authorId: Number(input.authorId),
                title: input.title || "",
                content: input.content || "",
                createdAt: new Date(),
                publishedAt: null,
            });
            return ctx.db.posts[id];
        },
        publishPost: (
            _parent: null,
            { id }: MutationPublishPostArgs,
            ctx: Context
        ) => {
            const matchedPosts = ctx.db.posts.filter((post) => post.id === id);
            if (matchedPosts.length === 0) return null;

            matchedPosts[0].publishedAt = new Date();
            return matchedPosts[0];
        },
        createComment: (
            _parent: null,
            { postId, input }: MutationCreateCommentArgs,
            ctx: Context
        ) => {
            const id = ctx.db.comments.length;
            ctx.db.comments.push({
                id,
                postId,
                username: input.username,
                text: input.text,
                replyToId: input.replyToId,
                createdAt: new Date(),
            });
            return ctx.db.comments[id];
        },
    },
};

export default resolvers;
