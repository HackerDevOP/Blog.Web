import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../shared/services/blog-service';
import { map } from 'rxjs';
import { PostModel } from '../shared/models/post.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'selector-name',
  template: `
        <header class="mb-12">
            <div class="flex items-center space-x-3 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                <span>{{category()}}</span>
                <span>•</span>
                <span class="text-slate-400">8 Min Read</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
                {{oneBlog()?.title}}
            </h1>

            <div class="flex items-center space-x-4 border-y border-slate-100 py-6">
                <img src="https://ui-avatars.com/api/?name={{oneBlog()?.authorId}}+{{blogId}}" class="w-10 h-10 rounded-full mr-3 border border-gray-700">
                <div>
                    <p class="font-bold text-slate-900">{{oneBlog()?.authorId}}</p>
                    <p class="text-sm text-slate-500">{{oneBlog()?.publishedAt}}</p>
                </div>
            </div>
        </header>
        <!-- <div class="mb-12 rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000" alt="Cover" class="w-full h-auto object-cover">
        </div> -->

        <div class="flex flex-col md:flex-row gap-12">

            <div class="flex-1 text-lg text-slate-700 leading-relaxed">
                <p class="mb-6">
                    {{oneBlog()?.content}}
                </p>

                <!-- <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Efficiency Matters</h2>
                <p class="mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <blockquote class="border-l-4 border-indigo-500 pl-6 my-10 italic text-xl text-slate-900 font-medium">
                    "Tailwind CSS isn't just a framework; it's a paradigm shift in how we think about UI components."
                </blockquote>

                <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Takeaways</h2>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li>Rapid prototyping without leaving your HTML.</li>
                    <li>Highly customizable through the tailwind.config.js.</li>
                    <li>Small bundle sizes thanks to PurgeCSS/JIT engine.</li>
                </ul>

                <p>
                    In conclusion, as we move through 2026, the demand for scalable and maintainable CSS has never been higher. Utility-first approaches offer the perfect balance for modern teams.
                </p> -->
            </div>

            <!-- <aside class="w-full md:w-64 space-y-10">
                <div class="bg-slate-50 p-6 rounded-2xl">
                    <h3 class="font-bold text-slate-900 mb-4">Share this post</h3>
                    <div class="flex flex-col gap-3">
                        <button class="w-full py-2 px-4 bg-[#1DA1F2] text-white text-sm font-bold rounded-lg hover:opacity-90 transition">Twitter</button>
                        <button class="w-full py-2 px-4 bg-[#0077B5] text-white text-sm font-bold rounded-lg hover:opacity-90 transition">LinkedIn</button>
                    </div>
                </div>

                <div class="p-6 border border-slate-100 rounded-2xl">
                    <h3 class="font-bold text-slate-900 mb-4">Related Topics</h3>
                    <div class="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-tighter">
                        <span class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">#CSS</span>
                        <span class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">#WEBDEV</span>
                        <span class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">#UI</span>
                    </div>
                </div>
            </aside> -->
        </div>
  `,
  host: {
    class: "max-w-4xl mx-auto px-6"
  },
  imports: [],
})
export class SinglePost {

  activatedRoute = inject(ActivatedRoute)
  blogService = inject(BlogService)
  oneBlog = signal<PostModel | null>(null)

  category = computed(()=>{
    const blog = this.oneBlog()
    if(blog && blog.categories && blog.categories.length > 0){
      return blog.categories[0].name
    }
    return "Undefined category"
  })

  blogId: any = 0;
  constructor(private route: ActivatedRoute) { }

  singleBlog() {
    this.blogService.get(this.blogId).subscribe({
      next: (res: any) => {
        this.oneBlog.set(res.result)
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.errorMessages)
      }
    })
  }
  ngOnInit() {
    this.blogId = this.activatedRoute.snapshot.paramMap.get('id')
    this.singleBlog();
  }


  // loadSingleBlog$ = this.blogService.get(this.blogId).pipe(
  //   map((res:any)=> res.result)
  // )

}
