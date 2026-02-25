import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  template: `
    <div class="min-h-screen bg-white flex flex-col justify-center items-center px-6">
    <div class="text-center">
        <p class="text-base font-semibold text-indigo-600 tracking-wide uppercase">404 Error</p>

        <h1 class="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-6xl">
            Page not found.
        </h1>

        <p class="mt-4 text-lg text-slate-500 max-w-md mx-auto">
            Sorry, we couldn’t find the page you’re looking for. Perhaps it was moved or deleted?
        </p>

        <div class="mt-10 flex justify-center">
            <svg class="h-48 w-auto text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <app-button
            routerLink="/home"
            variant="secondary"
            >Back to Home</app-button>
            <a href="mailto:support@yourblog.com"
               class="w-full sm:w-auto px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                Contact Support
            </a>
        </div>
    </div>

    <div class="mt-16 text-sm font-medium text-slate-400">
        <p>Looking for something specific? <a href="#" class="text-indigo-600 hover:underline">Search our blog</a></p>
    </div>
</div>
  `,
  imports: [ButtonComponent, RouterLink],
})
export class NotFound{

}
