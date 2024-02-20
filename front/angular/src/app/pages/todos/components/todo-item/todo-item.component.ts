import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OtherInputComponent } from '../../../../components/OtherInput/OtherInput.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../../../types/todos';

@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [OtherInputComponent, ReactiveFormsModule, FormsModule],
    templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
    @Input({ required: true }) todo: Todo | null = null
    @Output() deleteTodo = new EventEmitter<string>()
    @Output() saveTodo = new EventEmitter<Omit<Todo, 'timestamp'>>()

    disabled = true
    text = ''

    ngOnInit(): void {
        this.text = this.todo?.text || ''
    }

    onEditHandler() {
        this.disabled = false
    }
    onStashHandler() {
        this.disabled = true
        this.text = this.todo?.text || ''
    }
    onDeleteHandler() {
        if (this.todo?.id) {
            this.deleteTodo.emit(this.todo.id)
        }
    }
    onSaveHandler() {
        this.disabled = true
        if (this.todo) {
            this.saveTodo.emit({ id: this.todo.id, text: this.text })
        }
    }
}
