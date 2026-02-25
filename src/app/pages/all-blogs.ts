import { Blog } from './Blog';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-blogs',
  template: `
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            @for (blog of blogList(); track blog.id) {
              @if (blog.isPublished == true) {
                <article [routerLink]="['/blog',blog.id]" class="flex flex-col">
                <!-- <div class="overflow-hidden rounded-2xl mb-4">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" class="hover:scale-105 transition duration-300 aspect-video object-cover" alt="Article Thumbnail">
                </div> -->
                <span class="text-green-600 text-sm font-bold uppercase mb-2">{{blog.categories[0]?.name}}</span>
                <h3 class="text-xl font-bold mb-2 hover:text-indigo-600 transition cursor-pointer">{{blog.title}}</h3>
                <p class="text-gray-600 line-clamp-3 mb-4">{{blog.content}}</p>
                <div class="mt-auto flex items-center space-x-3 text-sm">
                    <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                    <span class="text-gray-500 italic">{{blog.authorId}}</span>
                </div>
            </article>
              }
            }
        </div>
    </main>

  `,
  imports: [RouterLink],
  host: {
    class: "bg-gray-50 font-sans text-gray-900"
  }
})
export class AllBlogs {

  blogService = inject(BlogService)
  blogList = signal<PostModel[]>([])
  ngOnInit(){
    this.loadBlog()
  }

  loadBlog() {
    this.blogService.getRemaining().subscribe({
      next: (res: any) => {
        this.blogList.set(res.result)
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
      }
    })
  }
}
