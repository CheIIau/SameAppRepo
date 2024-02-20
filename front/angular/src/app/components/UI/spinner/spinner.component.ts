import { KeyValuePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [KeyValuePipe],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    @Input() size = '10px'
    @Input() color = '#000'
    @Input() width = '6px'

    get containerSize() {
        return (parseInt(this.size, 10) + 16 + 'px')
    }

    styles = { size: this.size, color: this.color, width: this.width }
    stylesToString() {
        return Object.values(this.styles).reduce((acc, value) => acc + ' ' + value, '')
    }
}
