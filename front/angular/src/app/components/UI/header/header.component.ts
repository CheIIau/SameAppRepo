import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links = [
    { name: 'Home', link: '/' },
    { name: 'Posts', link: '/posts' },
    { name: 'About', link: '/about' },
    { name: 'Todos', link: '/todos' },
  ] as const

}
