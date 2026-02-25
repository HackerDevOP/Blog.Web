import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "../models/models";
import { API_URL } from "../../core/consts/api.path";

@Injectable({
  providedIn:"root"
})
export class CategoryService{
  http = inject(HttpClient)

  get():Observable<CategoryModel>{
    return this.http.get<CategoryModel>(API_URL.baseURL+API_URL.category)
  }

  post(obj:CategoryModel):Observable<CategoryModel>{
    return this.http.post<CategoryModel>(API_URL.baseURL+API_URL.category, obj)
  }

  put(id:number, obj:CategoryModel):Observable<CategoryModel>{
    return this.http.put<CategoryModel>(API_URL.baseURL+API_URL.category+id,obj)
  }

  delete(id:number):Observable<CategoryModel>{
    return this.http.delete<CategoryModel>(API_URL.baseURL+API_URL.category+id)
  }
}
