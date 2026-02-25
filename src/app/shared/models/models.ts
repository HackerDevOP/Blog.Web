export class CommentModel {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
  content: string;

  /**
   *
   */
  constructor() {
    this.id = 0,
      this.postId = 0,
      this.userId = 0,
      this.parentCommentId = 0,
      this.content = ""
  }

}


export class CategoryModel {
  id: number;
  name: string;

  /**
   *
   */
  constructor() {
    this.id = 0,
      this.name = ""
  }
}
