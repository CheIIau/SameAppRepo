import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Post } from '../../../../types/posts';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { decrease, increase } from '../../../../store/cart/cart.actions';
import { Observable } from 'rxjs';
import { Cart } from '../../../../store/cart/types';
import { selectCartState, selectPostFromCart } from '../../../../store/cart/cart.selector';

@Component({
    selector: 'app-post-item',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgOptimizedImage, AsyncPipe],
    templateUrl: './post-item.component.html',
})

export class PostItemComponent implements OnInit {
    @Input({ required: true }) post: Post | null = null
    @Input() showFooter: boolean = true

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        if (this.post) {
            this.itemsInCart$ = this.store.select(selectPostFromCart(this.post.id))
        }
    }
    itemsInCart$: Observable<number> | undefined

    buttonText = 'Not interested'
    setButtonText() {
        this.buttonText = 'Go f*** yourself'
    }
    decrease() {
        if (this.post) {
            this.store.dispatch(decrease({ id: this.post.id, by: 1, price: this.post.width }))
        }
    }

    increase() {
        if (this.post) {
            this.store.dispatch(increase({ id: this.post.id, by: 1, price: this.post.width }))
        }
    }
}
