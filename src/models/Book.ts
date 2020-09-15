export interface Book {
    title: string
    author: string
    publishYear: number
    rating: number
    stores: [{ label: string, link: string }],
    image: string
    html: string
}
