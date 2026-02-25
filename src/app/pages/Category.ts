import { Component, inject, signal, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category-service';
import { CategoryModel } from '../shared/models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { ButtonComponent } from '../shared/components/button';

@Component({
  selector: 'app-category',
  template: `
    <div class="max-w-5xl min-h-screen mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Blog Categories</h1>
          <p class="text-sm text-gray-500">Organize your posts into logical topics.</p>
        </div>
        <span
          class="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold shadow-sm"
        >
          Total: <span class="text-indigo-600">12 Categories</span>
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-8">
            <h2 class="text-lg font-bold mb-4 text-gray-800">Add New Category</h2>

            <form class="space-y-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >Name</label
                >
                <input
                  type="text"
                  [formField]="categoryForm.name"
                  placeholder="e.g. Technology"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                />
              </div>

              <!-- <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Slug</label>
                            <input type="text" placeholder="technology-news"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-sm italic" readonly>
                        </div> -->

              <!-- <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Theme Color</label>
                            <div class="flex gap-2 mt-2">
                                <button type="button" class="w-6 h-6 rounded-full bg-indigo-500 ring-2 ring-offset-2 ring-indigo-500"></button>
                                <button type="button" class="w-6 h-6 rounded-full bg-emerald-500 hover:scale-110 transition"></button>
                                <button type="button" class="w-6 h-6 rounded-full bg-rose-500 hover:scale-110 transition"></button>
                                <button type="button" class="w-6 h-6 rounded-full bg-amber-500 hover:scale-110 transition"></button>
                            </div>
                        </div> -->

              <!-- <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-all mt-4 text-sm shadow-md shadow-indigo-100">
                            Create Category
                        </button> -->
              <div class=" space-y-2">
                <app-button variant="ghost" (btnClick)="upsert()">{{
                  isEditMode ? 'Update Category' : 'Create Catgory'
                }}</app-button>
                <app-button variant="danger" (btnClick)="clearForm()">Clear form</app-button>
              </div>
            </form>
          </div>
        </div>

        <div class="md:col-span-2">
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table class="w-full text-left">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Category</th>
                  <!-- <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Post Count</th> -->
                  <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (category of categoryList(); track $index) {
                  <tr class="hover:bg-gray-50 transition-colors group">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-2 h-8 bg-emerald-500 rounded-full"></div>
                        <div>
                          <div class="font-bold text-gray-900 text-sm">{{ category?.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          (click)="edit(category)"
                          class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          (click)="delete(category.id)"
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- <div class="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
                    <svg class="w-5 h-5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/></svg>
                    <p class="text-xs text-indigo-800 leading-relaxed">
                        <strong>Tip:</strong> Categories with 0 posts will not be displayed on the public homepage by default. Deleting a category will move its posts to "Uncategorized".
                    </p>
                </div> -->
        </div>
      </div>
    </div>
  `,
  imports: [ButtonComponent, FormField],
  host: {
    class: 'bg-gray-50 font-sans antialiased text-gray-900',
  },
})
export class Category implements OnInit {
  ngOnInit(): void {
    this.getCategory();
  }
  delete(id: number) {
    this.categoryService.delete(id).subscribe({
      next: (res: any) => {
        this.getCategory();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message);
      },
    });
  }
  edit(obj: CategoryModel) {
    this.categoryModel.set({
      ...this.categoryModel(),
      name: obj.name,
      id: obj.id,
    });
    this.isEditMode = true;
  }

  categoryService = inject(CategoryService);
  categoryList = signal<CategoryModel[]>([]);
  isEditMode = false;

  categoryModel = signal<CategoryModel>({
    id: 0,
    name: '',
  });

  categoryForm = form(this.categoryModel, (rootPath) => {
    required(rootPath.name, { message: 'required' });
  });

  clearForm() {
    this.categoryModel.set({
      id: 0,
      name: '',
    });
    this.isEditMode = false;
  }

  upsert() {
    if (!this.categoryForm().valid()) {
      return alert('invalid form');
    }
    const formValue = this.categoryForm().value();
    console.log(formValue);

    const service$ = this.isEditMode
      ? this.categoryService.put(formValue.id, formValue)
      : this.categoryService.post(formValue);

    service$.subscribe({
      next: (res: any) => {
        this.categoryList.update((prev) => {
          return [...prev, res.result];
        });
        const message = this.isEditMode ? 'category edit success' : 'category create success';
        alert(message);
        this.categoryForm().reset();
        this.getCategory();
        this.clearForm();
      },
    });
  }

  getCategory() {
    this.categoryService.get().subscribe({
      next: (res: any) => {
        this.categoryList.set(res.result);
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.message);
      },
    });
  }
}
