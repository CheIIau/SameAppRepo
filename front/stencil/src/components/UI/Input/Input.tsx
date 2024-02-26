import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'input-component',
  styleUrl: '../../../index.css',
  shadow: true,
})
export class About {
  @Prop()
  value: string;

  @Prop()
  name?: string;

  @Event()
  changeValue: EventEmitter<string>;

  private _handleChange(event: InputEvent) {
    this.changeValue.emit((event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <input
        name={this.name}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={this.value}
        onInput={event => this._handleChange(event)}
      />
    );
  }
}
