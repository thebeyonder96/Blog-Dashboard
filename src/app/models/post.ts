export interface Post {
  title:string,
  permalink?:string,
  category:{
    categoryId:string,
    category:string,
  },
  postImgPath:string,
  excerpt:string,
  content:string,
  isFeatured:boolean,
  view:number,
  status:string,
  createdAt:Date
}
