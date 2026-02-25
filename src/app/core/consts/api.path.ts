export enum API_URL{
  baseURL = "https://localhost:7030/api",
  login = "/auth/login",
  register = "/auth/register",
  category = "/Categorys/",
  comments = "/Commnts/",
  posts = "/Posts/",
  users = "/Users/",
  top = "https://localhost:7030/api/Posts/Top",
  remaining = "https://localhost:7030/api/Posts/Remaining"
}


export enum StoreKeys {
  userKey = "loggedUser",
  jwtKey = "key"
}
