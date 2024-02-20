import { Post } from '../types/posts'

const baseUrl = 'https://api.unsplash.com/'

const init = {
    headers: {
        Authorization: 'Client-ID 9FYxR5JCIokiK6oGjoCHJWWSGhBl7QNu4cljxP8EhZc',
    },
}

export async function getPostsByPage(payload: { page: string }): Promise<Post[]> {
    const response = await fetch(`${baseUrl}photos?page=${payload.page}`, init)
    return await response.json()
}

export async function getPostById(payload: {id: string}): Promise<Post> {
    const response = await fetch(`${baseUrl}photos/${payload.id}`, init)
    return await response.json()
}
