import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-900 text-gray-400 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 text-center ">
            <div class="text-white font-black text-2xl mb-4">AG<span class="text-indigo-500">BLOG</span></div>
            <p class="text-sm">© 2026 AG-BLOG. All rights reserved.</p>
        </div>
    </footer>
  `,
  imports: [],
})
export class Footer{

}
