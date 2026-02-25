import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from "../shared/components/table.component";
import { PostModel } from '../shared/models/post.model';
import { ButtonComponent } from "../shared/components/button";
import { form, required, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../shared/services/blog-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../shared/services/category-service';
import { CategoryModel } from '../shared/models/models';
import { NgIf } from '@angular/common';
import { StoreKeys } from '../core/consts/api.path';

@Component({
  selector: 'app-blog',
  template: `
    <div class="max-w-6xl mx-auto px-4 py-10">

        <div class="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Post Management</h1>
                <p class="text-gray-500 mt-1">Create, edit, and manage your blog articles.</p>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-gray-400">Author ID:</span>
                <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{{parseUser.id}}</span>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div class="lg:col-span-4">
                <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                    <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round"/></svg>
                        {{isEdit? "Update Blog": "Create Blog"}}
                    </h2>

                    <form id="crudForm" class="space-y-5">
                      <input type="hidden" [formField]="postForm.authorId">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input type="text" [formField]="postForm.title"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Enter post title...">
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                            <textarea [formField]="postForm.content" rows="5"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Write your post content here..."></textarea>
                        </div>

                        <!-- Category Added -->
                        <div class="relative">
                          <select (change)="onCategoryChange($event)"
                                  class="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                            <option disabled [selected]="!postModel().categories.length">Select a category</option>
                            @for (category of listCategory(); track $index) {
                              <option [value]="category.id">
                                {{category.name}}
                              </option>
                            }
                          </select>


                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>

                        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <input type="checkbox" [formField]="postForm.isPublished" id="IsPublished"
                                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                            <label for="IsPublished" class="text-sm font-medium text-gray-700 cursor-pointer">
                                Publish immediately
                            </label>
                        </div>


                        <div class="pt-2 flex flex-col gap-2">
                          <app-button
                          (btnClick)="savePost()"
                          variant="danger"
                          >
                            {{isEdit? "Update blog": "Create blog"}}
                          </app-button>
                            <!-- <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-indigo-100">
                                Save Post
                            </button> -->
                            <button (click)="clearForm()" type="button" class="w-full bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2 rounded-xl border border-gray-200 transition-all text-sm">
                                Clear Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <app-table class=" w-3xl"
                [posts]="listPost"
                (edit)="handleEdit($event)"
                (delete)="handleDelete($event)">
            ></app-table>
        </div>
    </div>
  `,
  host: {
    class: "bg-gray-50 font-sans antialiased text-gray-900 pb-20"
  },
  imports: [TableComponent, ButtonComponent, FormField, FormsModule],
})
export class Blog implements OnInit {
  blogService = inject(BlogService)
  isEdit: boolean = false;

  listPost = signal<PostModel[]>([])
  listCategory = signal<CategoryModel[]>([])
  categoryService = inject(CategoryService)

  /**
   * Fetch categories once and keep them in a signal so we can use the
   * array when the user selects a category and when displaying results.
   */
  loadCategories() {
    this.categoryService.get().subscribe({
      next: (res: any) => this.listCategory.set(res.result),
      error: (err: HttpErrorResponse) => alert(err.error?.message || err.message)
    });
  }
  clearForm() {
    this.postModel.set({
      id: 0,
      authorId: this.parseUser?.id || "",
      title: "",
      isPublished: false,
      content: "",
      //createdAt: "",
      publishedAt: "",
      slug: "",
      categories: []
    })
    this.isEdit = false
  }

  getBlog() {
    this.blogService.getAll().subscribe({
      next: (res: any) => {
        this.listPost.set(res.result)
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.errorMessages)
      }
    })
  }

  /**
   * called when the user picks an item from the category <select>
   */
  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const id = +select.value;
    const cat = this.listCategory().find(c => c.id === id);
    if (cat) {
      this.postModel.set({ ...this.postModel(), categories: [cat] });
    } else {
      // no match, clear list
      this.postModel.update(prev => ({ ...prev, categoryList: [] }));
    }
  }

  savePost() {
    if (!this.postForm().valid()) {
      return alert("invalid form")
    }
    const formValue = this.postForm().value()

    // if categories are stored as objects convert them to ids so the
    // backend receives simple values (many APIs expect just the ids).
    let payload: PostModel = { ...formValue };
    if (payload.categories && Array.isArray(payload.categories)) {
      const ids = payload.categories.map((c: any) => c?.id ?? c);
      // backend expects a property called "categoryIds" instead of
      // "categories"; the previous implementation sent the wrong field
      // which triggered the "CategoryIds field is required" error.
      payload.categoryIds = ids;
    }

    console.log('payload', payload)

    const service$ = this.isEdit
      ? this.blogService.update(payload.id, payload)
      : this.blogService.create(payload)

    service$.subscribe({
      next: (res: any) => {
        this.listPost.update(prev => { return [...prev, res] })
        const message = this.isEdit ? "blog edit success" : "blog create success"
        alert(message)
        this.postForm().reset()
        this.getBlog()
        this.clearForm()
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.errorMessages)
      }
    })

  }
  ngOnInit(): void {
    // load categories first; the post list may reference them when we edit
    this.loadCategories();
    this.getBlog();

    this.loggedUser = sessionStorage.getItem(StoreKeys.userKey)
    if (this.loggedUser != null) {
      this.parseUser = JSON.parse(this.loggedUser);
      if (this.parseUser) {
        this.postModel.set({ ...this.postModel(), authorId: this.parseUser.id });
      }
    }
  }
  parseUser: any;
  loggedUser: any;

  postModel = signal<PostModel>({
    id: 0,
    authorId: "",
    title: "",
    isPublished: false,
    content: "",
    //createdAt: "",
    publishedAt: "",
    slug: "",
    categories: []
  })

  postForm = form(this.postModel, (rootPath) => {
    required(rootPath.title, { message: "title required" }),
      required(rootPath.content, { message: "content required" }),
      // ensure user picks at least one category before submitting
      required(rootPath.categories, { message: "category required" })
  })

  handleDelete($event: PostModel) {
    this.blogService.delete($event.id).subscribe({
      next: (res: PostModel) => {
        alert("delete success")
        this.getBlog();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message)
      }
    })
  }
  handleEdit($event: PostModel) {
    // ensure category objects are available for the form; backend may send
    // either ids or full objects.
    let cats: CategoryModel[] = [];
    if ($event.categories) {
      cats = ($event.categories as any[]).map(item => {
        if (item && typeof item === 'object') {
          return item as CategoryModel;
        }
        // assume it's an id
        return this.listCategory().find(c => c.id === +item) || { id: +item, name: '' };
      });
    }

    this.postModel.set({
      ...this.postModel(),
      authorId: $event.authorId,
      title: $event.title,
      content: $event.content,
      isPublished: $event.isPublished,
      id: $event.id,
      publishedAt: $event.publishedAt,
      slug: $event.slug,
      categories: cats
    });
    this.isEdit = true
  }

}
