import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../core/consts/api.path";
import { Observable } from "rxjs";
import { PostModel } from "../models/post.model";

@Injectable ({
  providedIn:"root"
})
export class BlogService{
  http = inject(HttpClient)


  getTop():Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.top)
  }
  getRemaining():Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.remaining)
  }


  getAll():Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.baseURL+API_URL.posts)
  }


  get(id:number):Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.baseURL+API_URL.posts+id)
  }

  create(obj:PostModel):Observable<PostModel>{
    return this.http.post<PostModel>(API_URL.baseURL+API_URL.posts,obj)
  }

  update(id:number, obj:PostModel):Observable<PostModel>{
    return this.http.put<PostModel>(API_URL.baseURL+API_URL.posts+id,obj)
  }

  delete(id:number):Observable<PostModel>{
    return this.http.delete<PostModel>(API_URL.baseURL+API_URL.posts+id)
  }
}
