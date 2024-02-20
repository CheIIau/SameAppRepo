import { Injectable } from '@angular/core';
import { Post } from '../../types/posts';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    private baseUrl = 'https://api.unsplash.com/'
    private init = {
        headers: {
            Authorization: 'Client-ID 9FYxR5JCIokiK6oGjoCHJWWSGhBl7QNu4cljxP8EhZc',
        },
    }

    public async getPostsByPage(page: string): Promise<Post[] | { errors: string[] }> {
        const response = await fetch(`${this.baseUrl}photos?page=${page}`, this.init)
        return await response.json() ?? []
    }

    public async getPostById(id: string): Promise<Post | { errors: string[] }> {
        const response = await fetch(`${this.baseUrl}photos/${id}`, this.init)
        return await response.json() ?? {}
    }
}

