import { Component, } from '@angular/core';
import { ChildComponent } from './components/child/child.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [ChildComponent, RouterLink],
    templateUrl: './about.component.html',
})
export class AboutComponent {
    property = '123'
    otherProperty = '321'

    setOtherPropety(value: string) {
        this.otherProperty = value
    }
}
