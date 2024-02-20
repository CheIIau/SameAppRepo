import { Component, ErrorHandler, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostService } from '../../api/post/post.service';
import { Post } from '../../types/posts';
import { SpinnerComponent } from '../../components/UI/spinner/spinner.component';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [PostItemComponent, SpinnerComponent],
    templateUrl: './post.component.html',
})
export class PostComponent implements OnInit, ErrorHandler {
    id: string;
    postService: PostService = inject(PostService)
    loading = false
    error: string | null = null
    post: null | Post = null

    constructor(private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }

    async ngOnInit(): Promise<void> {
        if (this.id) {
            await this.getPost(this.id)
        }
    }

    private async getPost(id: string) {
        try {
            this.loading = true
            const post = await this.postService.getPostById(this.id)
            ///@ts-expect-error
            if (!post.errors) {
                this.post = (post as Post)
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

    handleError(error: any): void {
        console.error(error)
    }

}
