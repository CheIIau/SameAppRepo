import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../store/cart/types';
import { AppState } from '../../../store/app.state';
import { selectCartState, selectTotalItems, selectTotalPrice } from '../../../store/cart/cart.selector';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './cart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
    cart$: Observable<Cart>

    constructor(private store: Store<AppState>) {
        this.cart$ = this.store.select(selectCartState)
    }

    ngOnInit(): void {
        this.totalItems = this.store.select(selectTotalItems)
        this.totalPrice = this.store.select(selectTotalPrice)
    }
    totalItems: Observable<number> | undefined
    totalPrice: Observable<number> | undefined
}
