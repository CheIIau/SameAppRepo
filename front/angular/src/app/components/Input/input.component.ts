import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [],
    template: `
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            (input)="changeValue($event)"
            [value]="value"
        />
   `
})

export class InputComponent {
    @Input() value = ''
    @Output() valueChange = new EventEmitter<string>();

    changeValue(event: Event) {
        this.valueChange.emit((event.target as HTMLInputElement).value);
    }
}
