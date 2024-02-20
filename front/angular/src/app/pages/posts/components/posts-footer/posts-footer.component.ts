import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-posts-footer',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './posts-footer.component.html',
})
export class PostsFooterComponent {
    constructor(private activateRoute: ActivatedRoute) {
        this.page = activateRoute.snapshot.params['page'];
        activateRoute.params.subscribe(routeParams=>{
            this.page = routeParams['page']
        })
    }

    page: string;

    get nextPage() {
        return this.page ? +this.page + 1 : 2
    }
    get prevPage() {
        return this.page ? +this.page - 1 : 1
    }


}
