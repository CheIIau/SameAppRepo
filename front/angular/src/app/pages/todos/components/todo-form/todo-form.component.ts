import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'; //FormsModule for app-input with [(value)]="newTodo"
import { InputComponent } from '../../../../components/Input/input.component';
import { OtherInputComponent } from '../../../../components/OtherInput/OtherInput.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, OtherInputComponent, NgClass],
    templateUrl: './todo-form.component.html',
})

export class TodoFormComponent {
    todoForm = new FormGroup({
        text: new FormControl('', Validators.required),
    });

    @Output() addTodo = new EventEmitter<{ text: string }>()

    async onSubmit(e: SubmitEvent) {
        //@ts-expect-error
        this.addTodo.emit(this.todoForm.value);
        this.todoForm.reset()
    }
}
