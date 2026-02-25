import { AuthService } from './../shared/services/auth-service';
import { LoginModel, RegisterModel } from './../shared/models/user.model';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { form, minLength, required, validate, FormField } from '@angular/forms/signals';
import { ButtonComponent } from "../shared/components/button";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  template: `

        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div class="text-3xl font-black tracking-tighter text-gray-900">
                NG<span class="text-indigo-600">BLOG</span>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-gray-900 tracking-tight">Join the community</h2>
            <p class="mt-2 text-sm text-gray-500">
                Already have an account?
                <a routerLink="/login" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Sign in</a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div class="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-2xl sm:px-10">
                <form id="registerForm" class="space-y-5">

                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <div class="mt-1">
                            <input [formField]="registerForm.username" id="username" type="text" placeholder="johndoe"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" [formField]="registerForm.email" type="email" placeholder="you@example.com"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                    </div>

                    <div>
                        <label for="education" class="block text-sm font-medium text-gray-700">Education</label>
                        <div class="mt-1">
                            <input id="education" [formField]="registerForm.education" type="text" placeholder="University / Degree"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" [formField]="registerForm.password" type="password" placeholder="••••••••"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                        <p class="mt-2 text-xs text-gray-400">Must be at least 8 characters long.</p>
                    </div>
                    <div>
                      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="confirmPassword" [formField]="registerForm.confirmPassword" type="password" placeholder="••••••••"
                                class="block w-full rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition-all">
                        </div>
                    </div>

                    <!-- <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="terms" name="terms" type="checkbox" required
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="text-gray-600 text-xs">By signing up, you agree to our <a href="#" class="text-indigo-600 underline">Terms</a> and <a href="#" class="text-indigo-600 underline">Privacy Policy</a>.</label>
                        </div>
                    </div> -->

                    <!-- <button type="submit" id="submitBtn"
                        class="group relative flex w-full cursor-pointer justify-center rounded-lg bg-indigo-600 py-3 px-4 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-[0.98]">
                        Create Account
                    </button> -->
                    <app-button (btnClick)="register()" variant="secondary">
                        Create Account
                    </app-button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-xs text-gray-400">
                        Protected by reCAPTCHA
                    </p>
                </div>
            </div>
        </div>

  `,
  imports: [RouterLink, FormField, ButtonComponent],
  host: {
    class: "min-h-screen flex flex-col justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8"
  }
})
export class Register {
  authService = inject(AuthService)
  route = inject(Router)
  register() {
    if (this.registerForm().valid()) {
      const formValue = this.registerForm().value()
      this.authService.Register(formValue).subscribe({
        next:(res:any)=>{
              alert("user registered success")
          this.route.navigateByUrl("/login")
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.error.errorMessages)
        }
      })
    } else {
      console.log("invalid form submit")
    }
  }



  registerModel = signal({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    education: ""
  })
  registerForm = form(this.registerModel, (rootPath) => {
    required(rootPath.username, { message: "requird" }),
      required(rootPath.email, { message: "required" }),
      required(rootPath.password, { message: "required" }),
      required(rootPath.confirmPassword, { message: "required" }),
      minLength(rootPath.password, 6, { message: "minimum length of password is 6" })

    validate(rootPath.confirmPassword, ({ value, valueOf }) => {
      const password = valueOf(rootPath.password)
      const confirmPassword = value();
      if (!password) return null;
      if (password !== confirmPassword) {
        return {
          kind: "password mismatch",
          message: "password do not match"
        }
      }
      return null
    })
  })
}
