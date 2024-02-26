import { Component, h } from '@stencil/core';

@Component({
  tag: 'about-page',
  styleUrl: '../index.css',
  shadow: true,
})
export class About {
  render() {
    return <p>About</p>;
  }
}
