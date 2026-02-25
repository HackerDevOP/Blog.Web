import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginModel } from '../shared/models/user.model';
import { form, minLength, required, FormField } from '@angular/forms/signals';
import { AuthService } from '../shared/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreKeys } from '../core/consts/api.path';

@Component({
  selector: 'app-login',
  template: `
          <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div class="text-3xl font-black tracking-tighter text-slate-600">
                AG<span class="text-indigo-600">BLOG</span>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <!-- <p class="mt-2 text-sm text-gray-500">
                Or <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
            </p> -->
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 border border-gray-200 sm:rounded-xl sm:px-10">
                <form class="space-y-6">

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Username or Email address</label>
                        <div class="mt-1">

                              <input id="email" [formField]="loginForm.username" type="text" autocomplete="username"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">

                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" [formField]="loginForm.password" type="password" autocomplete="current-password"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                    </div>

                    <!-- <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer">Remember me</label>
                        </div>
                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div> -->

                    <button (click)="login()" type="button"
                        class="flex w-full justify-center rounded-lg cursor-pointer bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-[0.98]">
                        Sign in
                    </button>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="bg-white px-2 text-gray-500">Don't have an account?</span>
                        </div>
                    </div>

                    <div class="mt-6">
                      <button routerLink="/register" class="flex w-full justify-center cursor-pointer items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                            Signup
                        </button>
                        <!-- <button class="flex w-full justify-center items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition">
                            <img class="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google logo">
                            Continue with Google
                        </button> -->
                    </div>
                </div>
            </div>

            <p class="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest">
                Secured by AV-SHIELD
            </p>
        </div>
  `,
  host: {
    class: "min-h-screen flex flex-col bg-slate-100 justify-center py-12 sm:px-6 lg:px-8"
  },
  imports: [RouterLink, FormField],
})
export class Login {
  authService = inject(AuthService)
  route = inject(Router)

  userModel = signal(new LoginModel());

  loginForm = form(this.userModel, (rootPath) => {
    required(rootPath.username, { message: "This field is required" });
    // required(rootPath.email, { message: "This field is required" });
    required(rootPath.password, { message: "This field is required" });
    minLength(rootPath.password, 6, { message: "minimum 6 length required" })
  })


  login() {
    if (this.loginForm().valid()) {
      const payload = this.loginForm().value();
      this.authService.Login(payload).subscribe({
        next: (res: any) => {
          if (res.isSuccess == true) {
            sessionStorage.setItem(StoreKeys.jwtKey, JSON.stringify(res.result.token))
            sessionStorage.setItem(StoreKeys.userKey, JSON.stringify(res.result.user))
            this.route.navigateByUrl("/home")
          }
        },
        error: (err:HttpErrorResponse) => {
          alert(err.error.errorMessages)
        }
      })
    } else {
      alert("Invalid form")
    }


  }

}
