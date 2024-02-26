import { Component, h } from '@stencil/core';
import { totalItems, totalPrice } from '../../../store/store';

@Component({
  tag: 'cart-component',
  styleUrl: '../../../index.css',
  shadow: true,
})
export class About {
  render() {
    return (
      <summary class="fixed top-0 right-0 flex gap-3 items-center p-2 bg-teal-800 text-teal-200 rounded-b-lg mr-4">
        <div>items: {totalItems()}</div>
        <div>total: {totalPrice()}</div>
      </summary>
    );
  }
}
