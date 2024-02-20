import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-other-input',
    standalone: true,
    imports: [FormsModule, NgClass],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OtherInputComponent),
        multi: true
    }],
    template: `
        <!-- <input можно и так
            [value]="value"
            (input)="onInput($event)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        /> -->
        <input
            [(ngModel)]="value"
            [disabled]="disabled"
            [ngClass]="{' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500': true, 'bg-gray-50 dark:bg-indigo-700': !disabled, 'bg-gray-400 dark:bg-indigo-400': disabled}"
            class=""
        />
   `
})

export class OtherInputComponent implements OnInit, ControlValueAccessor {
    private _value = '';

    //Для того чтобы родительская форма знала об изменениях контрола, нам нужно вызывать метод onChange
    // на каждое изменение значения value. Чтобы не писать вызов onChange в каждом методе (их может быть несколько),
    // можно реализовать поле value через геттеры и сеттеры:

    @Input()
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(this._value);
    }

    @Input() disabled: boolean = false

    ngOnInit() {
    }

    writeValue(str: string): void {
        this.value = str
    }

    onChange(value: string) { }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn
    }

    onTouch() { }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn
    }

    // onInput(event: Event) {
    //     this.value = (event.target as HTMLInputElement).value
    // }
}
