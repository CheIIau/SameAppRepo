import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PostComponent } from './pages/post/post.component';
import { About2Component } from './pages/about/about2/about2.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full', title: "Home" },
    { path: 'about', component: AboutComponent, title: "About" },
    { path: 'about/second', component: About2Component, title: "About2" },
    { path: 'post/:id', component: PostComponent, title: "Post" },
    { path: 'posts/:page', component: PostsComponent, title: "Posts" },
    { path: 'posts', redirectTo: 'posts/1', pathMatch: 'full' },
    { path: 'todos', component: TodosComponent, title: 'Todos' },
];
