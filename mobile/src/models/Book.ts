// For main page listings
export type Book = {
    id: string
    title: string
    author: string
    image?: string
    created_at: string
};

// Contains the contents of a book (all book information)
type BookDetails = {
    id: string
    title: string
    author: string
    image?: string
    read: TabContent
    explore: TabContent
    learn: TabContent
    created_at: string
};

type TabContent = {
    video?: string;
    body: string;
};
