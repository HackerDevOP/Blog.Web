import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button';
import { StoreKeys } from '../consts/api.path';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="shrink-0 flex items-center">
            <a routerLink="/home" class="text-2xl font-bold text-gray-900 tracking-tight">
              AG<span class="text-indigo-600">BLOG</span>
            </a>
          </div>

          <div class="hidden md:flex space-x-8 items-center">
            <a
              routerLink="/home"
              class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >Home</a
            >
            @if (loggedUser != null) {
              <a
                routerLink="/create-blog"
                class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >Create Blog</a
              >
              <a
                routerLink="/category"
                class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >Category</a
              >
              <a
                routerLink="/comment"
                class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >Comment</a
              >
            }
          </div>

          <div class="hidden md:flex items-center space-x-4">
            <!-- <div class="relative">
          <input type="text"
                 placeholder="Search posts..."
                 class="bg-gray-50 border border-gray-200 text-sm rounded-full py-1.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all focus:w-64">
        </div>
        <button class="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all">
          Subscribe
        </button> -->

            @if (loggedUser != null) {
              <app-button (btnClick)="logoff()" variant="danger">Logout</app-button>
            }@else {
              <app-button variant="ghost" routerLink="/login">Login</app-button>
              <app-button variant="ghost" routerLink="/register">Register</app-button>
            }
          </div>

          <div class="md:hidden flex items-center">
            <button class="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-outlet />
    </div>
    <!-- <app-footer /> -->
  `,
  imports: [RouterLinkWithHref, RouterOutlet,  ButtonComponent],
})
export class Navbar {
  loggedUser = sessionStorage.getItem(StoreKeys.userKey);

  route = inject(Router);
  logoff() {
    sessionStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
