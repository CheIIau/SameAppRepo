import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ChangeValueDirective } from '../../../directives/change-value.directive';

@Component({
    selector: 'app-about2',
    standalone: true,
    imports: [CommonModule, ChangeValueDirective],
    templateUrl: './about2.component.html',
})

export class About2Component implements OnInit {
    word = '123';
    phrase = signal('321');
    show = true;

    constructor(private location: Location) {}
    changeWord(event: MouseEvent) {
        this.word = String(Math.ceil(Math.random() * 100));
    }
    typeWord(event: Event) {
        this.word = (event.target as HTMLInputElement).value;
    }
    ngOnInit(): void {
        setTimeout(() => {
            this.phrase.set('1111');
        }, 1000);
    }
    back(): void {
        this.location.back()
    }
}
