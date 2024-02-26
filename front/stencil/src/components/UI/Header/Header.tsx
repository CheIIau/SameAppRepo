import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'header-component',
  styleUrl: 'Header.css',
  shadow: true,
})
export class Header {
  private links = [
    { name: 'Home', link: '/' },
    { name: 'Posts', link: '/posts/1' },
    { name: 'About', link: '/about' },
    { name: 'Todos', link: '/todos' },
  ] as const;

  @State()
  private currentUrl = window.location.pathname;

  private _setCurrentLocation = () => {
    this.currentUrl = window.location.pathname;
  };

  connectedCallback() {
    window.addEventListener('popstate', this._setCurrentLocation);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._setCurrentLocation);
  }

  render() {
    return (
      <header class="header">
        <nav class="w-full flex justify-center">
          <svg viewBox="0 0 2 3" class="svg text-indigo-800" aria-hidden="true">
            <path class="fill-current" d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
          </svg>
          <ul class="bg-indigo-800 flex justify-center items-center [&>li]:relative [&>li]:h-full">
            {this.links.map(link => (
              <li key={link.link}>
                <a href={link.link} class={`link ${checkRouteMatch(link.link, this.currentUrl) ? 'text-amber-600' : 'text-slate-400'}`}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <svg viewBox="0 0 2 3" class="svg text-indigo-800" aria-hidden="true">
            <path class="fill-current" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
          </svg>
        </nav>
      </header>
    );
  }
}

function checkRouteMatch(link: string, currentRoute: string) {
  const regexp = /^\/([^/]+\/[^/]+)(\/.*)?$/;
  const routeWithoutParams = currentRoute.replace(regexp, '');
  const linkWithoutParams = link.replace(regexp, '');
  return routeWithoutParams === linkWithoutParams;
}
