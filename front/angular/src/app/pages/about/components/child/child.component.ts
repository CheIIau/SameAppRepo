import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-child',
    standalone: true,
    imports: [],
    templateUrl: './child.component.html',
})

export class ChildComponent implements OnInit, AfterViewInit {
    @Input() prop = ''
    @Output() newStringEvent = new EventEmitter<string>();

    changeString(value: string) {
        this.newStringEvent.emit(value);
    }

    @ViewChild('newItem') input: ElementRef<HTMLInputElement> | undefined

    ngOnInit(): void {
        console.log(this.input)
    }

    ngAfterViewInit(): void {
        console.log(this.input)
    }
    // @HostListener('window:resize', ['$event'])
    // onResize(event: Event) {
    //     console.log(event)
    // }
}

