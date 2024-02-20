import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appChangeValue]',
    standalone: true
})

export class ChangeValueDirective implements AfterViewInit {
    currentElement: HTMLInputElement | null = null
    initialValue: string | null = null

    constructor(private el: ElementRef<HTMLInputElement>) {
        this.currentElement = el.nativeElement
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.changeValue('dick_butt');
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.changeValue(this.initialValue || '');
    }

    private changeValue(word: string) {
        this.el.nativeElement.value = word
    }

    ngAfterViewInit(): void {
        this.initialValue = this.currentElement?.value || null
    }
}
