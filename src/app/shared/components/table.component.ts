import { Component, EventEmitter, Input, NgModule, Output, signal } from '@angular/core';
import { PostModel } from '../models/post.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  template: `
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50 border-b border-gray-200">
          <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Post Info</th>
          <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Categories</th>
          <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Status</th>
          <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        @for (post of posts(); track $index) {
          <tr class="hover:bg-gray-50/50 transition-colors">
          <td class="px-6 py-5" >
            <div class="font-bold text-gray-900 mb-1">{{post.title}}</div>
            <div class="text-sm text-gray-500 line-clamp-1 max-w-xs">{{post.content}}</div>
          </td>
          <td class="px-6 py-5">
            {{formatCategories(post.categories)}}
          </td>
          <td class="px-6 py-5 text-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase"
                  >
              {{post.isPublished? "Published":"Pending"}}
            </span>
          </td>
          <td class="px-6 py-5 text-right space-x-2">
            <button (click)="onEdit(post)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button (click)="onDelete(post)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>
</div>
  `,
  imports: [],
})
export class TableComponent {
  @Input() posts = signal<PostModel[]>([])

  @Output() edit = new EventEmitter<PostModel>();
  @Output() delete = new EventEmitter<PostModel>();

  onEdit(post: PostModel) {
    this.edit.emit(post);
  }

  onDelete(post: PostModel) {
    this.delete.emit(post);
  }

  getStatusClass(status: string): string {
    return status === 'Published'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-500';
  }

  /**
   * Accepts either an array of CategoryModel objects or simple values and
   * returns a comma‑separated list of names/ids for display.
   */
  formatCategories(categories: any[]): string {
    if (!categories || !categories.length) return '';
    return categories
      .map(c => {
        if (c && typeof c === 'object') {
          return c.name || c.id;
        }
        return c;
      })
      .join(', ');
  }
}
