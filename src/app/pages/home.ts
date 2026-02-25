import { API_URL } from './../core/consts/api.path';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "../core/components/navbar";
import { BlogService } from '../shared/services/blog-service';
import { PostModel } from '../shared/models/post.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { Footer } from "../core/components/footer";

@Component({
  selector: 'app-home',
  template: `
  <app-navbar/>
<body class="">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <!-- <section class="mb-16">
            <div class="relative group cursor-pointer overflow-hidden rounded-3xl bg-gray-900 lg:flex lg:items-center">
                <div class="lg:w-1/2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                         alt="Featured"
                         class="w-full h-64 lg:h-112.5 object-cover transition duration-500 group-hover:scale-105 opacity-80">
                </div>
                <div class="p-8 lg:p-12 lg:w-1/2">
                    <span class="inline-block px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold tracking-widest uppercase mb-4">Featured Article</span>
                    <h1 class="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">The Future of Angular: Signal-Based Components and Beyond</h1>
                    <p class="text-gray-300 text-lg mb-8 leading-relaxed">Explore how the latest updates in the Angular ecosystem are changing the way we handle reactivity and state management in modern web apps.</p>
                    <div class="flex items-center text-sm text-gray-400">
                        <img src="https://ui-avatars.com/api/?name=Admin+User" class="w-10 h-10 rounded-full mr-3 border border-gray-700">
                        <div>
                            <p class="text-white font-medium">Admin User</p>
                            <p>Feb 23, 2026 • 8 min read</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <section class="relative py-20 lg:py-32 bg-white overflow-hidden">

  <div class="absolute inset-0 z-0">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size:24px_24px mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
  </div>

  <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

    <span class="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
      Welcome to our community
    </span>

    <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
      Insights for the <span class="text-indigo-600">Modern Creative</span>
    </h1>

    <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
      We share stories, tutorials, and deep-dives into the worlds of design, technology, and productivity. Join over 10,000 readers staying ahead of the curve.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a routerLink="/blogs" class="w-full sm:w-auto px-8 py-4 text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all">
        Start Reading
      </a>
    </div>

    <div class="mt-16 pt-8 border-t border-slate-100">
      <p class="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6">Featured in</p>
      <div class="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale">
        <span class="text-xl font-bold text-slate-600 italic">TechWorld</span>
        <span class="text-xl font-bold text-slate-600 italic">Design Weekly</span>
        <span class="text-xl font-bold text-slate-600 italic">The Daily UI</span>
        <span class="text-xl font-bold text-slate-600 italic">Dev.to</span>
      </div>
    </div>

  </div>
</section>
        <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 class="text-2xl font-bold">Recent Stories</h2>
            <div class="flex space-x-4 text-sm">
                <button routerLink="/blogs" class="font-bold text-indigo-600">View All</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- @if(blogList().length != 0){ -->
              @for (blog of top3$|async; track $index) {
              @if(blog.isPublished == true){
                <article [routerLink]="['/blog',blog.id]" class="group cursor-pointer">
                <!-- <div class="overflow-hidden rounded-2xl mb-4 h-52">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80"
                         class="w-full h-full object-cover transition duration-300 group-hover:scale-105">
                </div> -->
                <span class="text-indigo-600 text-xs font-bold uppercase tracking-widest">{{blog.categories[0]?.name}}</span>
                <h3 class="text-xl font-bold mt-2 mb-3 group-hover:text-indigo-600 transition">{{blog.title}}</h3>
                <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{blog.content}}</p>
                <div class="flex items-center text-xs text-gray-400">
                    <span>{{blog.publishedAt|date}}</span>
                </div>
            </article>
              }
              }
            <!-- }
          @else{
              <div class="flex flex-col items-center justify-center px-4 bg-white">
                  <div class="max-w-md w-full text-center">
                      <div class="mb-8 flex justify-center">
                          <div class=" relative">
                              <div class="absolute inset-0 bg-indigo-100 rounded-full scale-150 opacity-50 animate-pulse"></div>
                              <svg class="relative h-24 w-24 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 10l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2" class="text-indigo-600" />
                              </svg>
                          </div>
                      </div>
                        <h2 class="text-3xl font-bold text-slate-900 mb-4 tracking-tight">No articles found</h2>
                  </div>
              </div>
              } -->

        </div>

        <section class="mt-20 rounded-3xl bg-indigo-50 p-8 md:p-16 text-center">
            <h2 class="text-3xl font-bold mb-4">Want the latest insights?</h2>
            <p class="text-gray-600 mb-8 max-w-lg mx-auto">Join over 10,000 developers receiving our weekly newsletter on tech, career, and productivity.</p>
            <form class="flex flex-col sm:flex-row justify-center gap-4">
                <input type="email" placeholder="Enter your email" class="px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80">
                <button class="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition">Join Now</button>
            </form>
        </section>

    </main>
</body>
<app-footer/>
  `,
  host: {
    class: "bg-white text-gray-900 font-sans"
  },
  imports: [DatePipe, RouterLink, AsyncPipe, Navbar, Footer],
})
export class Home implements OnInit {


  blogService = inject(BlogService)
  blogList = signal<PostModel[]>([])

  ngOnInit(): void {
  }
  top3$ = this.blogService.getTop().pipe(
    map((res: any) => res.result)
  )


}
