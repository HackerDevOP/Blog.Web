import { Routes } from '@angular/router';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './core/components/navbar';
import { Blog } from './pages/Blog';
import { Category } from './pages/Category';
import { NotFound } from './core/components/Not-found';
import { Comment } from './pages/Comment';
import { Home } from './pages/home';
import { loginGuard } from './Interceptor/login-guard';
import { AllBlogs } from './pages/all-blogs';
import { SinglePost } from './pages/single-post';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "register",
    component: Register
  },
  {
    path: "home",
    component: Home
  },
  {
    path: "",
    component: Navbar,
    canActivate: [loginGuard],
    children: [


      {
        path: "create-blog",
        component: Blog
      },
      {
        path: "blogs",
        component: AllBlogs
      },
      {
        path: "blog/:id",
        component: SinglePost
      },
      {
        path: "category",
        component: Category
      },
      {
        path: "comment",
        component: Comment
      }
    ]
  },
  {
    path: "**",
    component: NotFound
  }
];
