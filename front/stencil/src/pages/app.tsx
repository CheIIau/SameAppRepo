import { Component, Prop, h } from '@stencil/core';
import '../components/UI/Header/Header'
import '../components/UI/Cart/Cart'

@Component({
  tag: 'stencil-app',
  styleUrl: '../index.css',
  shadow: true,
})
export class App {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string = 'none';

  /**
   * The last name
   */
  @Prop() last: string;

  // private getText(): string {
  //   return `${this.first} ${this.middle} ${this.last}`;
  // }

  render() {
    return (
      <div class="flex flex-col min-h-screen">
        <header-component></header-component>
        <cart-component></cart-component>
        <main class="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">
          <slot></slot>
        </main>
      </div>
    );
  }
}
