export class LoginModel {
  username: string;
  email: string;
  password: string;
  /**
   *
   */
  constructor() {
    this.username = "",
      this.email = "",
      this.password = ""
  }
}


export class RegisterModel {
  username: string;
  email: string;
  password: string;
  education: string
  /**
   *
   */
  constructor() {
    this.username = "",
      this.email = "",
      this.password = "",
      this.education = ""
  }
}
