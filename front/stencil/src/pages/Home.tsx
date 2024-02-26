import { Component, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: '../index.css',
  shadow: true,
})
export class Home {
  render() {
    return <p>Home</p>;
  }
}
