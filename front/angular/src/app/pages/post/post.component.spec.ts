import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { ActivatedRoute } from '@angular/router';

describe('PostComponent', () => {
    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PostComponent],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    snapshot: { params: { id: '24fkzrw3487943uf358lovd' } }
                }
            }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        console.log(component.id)
        expect(component).toBeTruthy();
    });
});
