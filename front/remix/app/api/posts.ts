import { Post } from '~/types/posts'

const baseUrl = 'https://api.unsplash.com/'

const init = {
    headers: {
        Authorization: 'Client-ID 9FYxR5JCIokiK6oGjoCHJWWSGhBl7QNu4cljxP8EhZc',
    },
}

export async function getPostsByPage(page: string): Promise<Post[] | { errors: string[] }> {
    const response = await fetch(`${baseUrl}photos?page=${page}`, init)
    return await response.json()
}

export async function getPostById(id: string): Promise<Post | { errors: string[] }> {
    const response = await fetch(`${baseUrl}photos/${id}`, init)
    return await response.json()
}
