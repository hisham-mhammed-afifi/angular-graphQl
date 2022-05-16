import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  paginatedPosts: any[] = [];
  pages: number[] = [];
  itemsPerPage: number = 10;
  pageNum: number = 1;
  searchTerm: string = '';

  constructor(private postsSrv: PostsService) {}

  ngOnInit(): void {
    this.postsSrv.all().subscribe(({ data: { posts } }) => {
      this.posts = posts.data;
      this.pages = this.getPages(this.posts);

      this.paginatedPosts = this.paginate(
        [...this.posts],
        this.itemsPerPage,
        this.pageNum
      );
    });

    // dont do that
    this.add();
    this.delete();
    this.update();
  }

  next() {
    this.pageNum < this.pages.length
      ? this.pageNum++
      : (this.pageNum = this.pages.length);
    this.posts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      this.pageNum
    );
  }
  prev() {
    this.pageNum > 1 ? this.pageNum-- : (this.pageNum = 1);
    this.posts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      this.pageNum
    );
  }

  changePage(page: number) {
    this.pageNum = page;
    this.posts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      page
    );
  }

  search(value: string) {
    this.searchTerm = value;
    const res = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(res, this.itemsPerPage, 1);
    this.pages = this.getPages(res);
  }

  paginate(items: Array<any>, itemsPerPage: number, pageNum: number) {
    const idx = (pageNum - 1) * itemsPerPage;
    return items.slice(idx, idx + itemsPerPage);
  }
  getPages(arr: number[]) {
    return [...Array(Math.ceil(arr.length / this.itemsPerPage)).keys()].map(
      (k) => k + 1
    );
  }

  filterArr(arr: any[]) {
    return [...arr].filter((item) => {
      return item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  add() {
    this.postsSrv.create().subscribe((data) => console.log(data));
  }
  delete() {
    this.postsSrv.delete().subscribe((data) => console.log(data));
  }
  update() {
    this.postsSrv.update().subscribe((data) => console.log(data));
  }
}
