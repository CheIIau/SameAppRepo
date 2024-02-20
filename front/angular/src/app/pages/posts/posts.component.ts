import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../api/post/post.service';
import { Post } from '../../types/posts';
import { PostItemComponent } from '../post/components/post-item/post-item.component';
import { SpinnerComponent } from '../../components/UI/spinner/spinner.component';
import { PostsFooterComponent } from './components/posts-footer/posts-footer.component';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [PostItemComponent, SpinnerComponent, PostsFooterComponent],
    templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
    page: string;
    postService: PostService = inject(PostService)
    loading = false
    error: string | null = null
    posts: null | Post[] = null

    constructor(private activateRoute: ActivatedRoute) {
        this.page = activateRoute.snapshot.params['page'];
        activateRoute.params.subscribe(routeParams => {
            this.page = routeParams['page']
            if (this.page) {
                this.getPosts(this.page)
            }
        })
    }

    async ngOnInit(): Promise<void> {
        if (this.page) {
            await this.getPosts(this.page)
        }
    }

    private async getPosts(page: string) {
        try {
            this.loading = true
            const post = await this.postService.getPostsByPage(this.page)
            ///@ts-expect-error
            if (!post.errors) {
                this.posts = (post as Post[])
            } else {
                ///@ts-expect-error
                this.error = post.errors[0]
            }
        } catch (error) {
            this.error = 'Something went wrong'
            console.log(error)
        } finally {
            this.loading = false
        }
    }
}
