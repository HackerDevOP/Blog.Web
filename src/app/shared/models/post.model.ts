import { CategoryModel } from './models';

export class PostModel {
  id: number
  authorId: string;
  title: string;
  content: string;
  isPublished: boolean;
  //createdAt: string;
  publishedAt: string;
  slug: string;
  categories: CategoryModel[];
  // API sometimes expects a separate array of ids instead of objects
  categoryIds?: number[];
  /**
   *
   */
  constructor() {
    this.id = 0;
    this.authorId = "";
    this.title = "",
      this.isPublished = false,
      this.content = "",
      //this.createdAt = "",
      this.publishedAt ="",
      this.slug = "",
      this.categories = []
  }
}
