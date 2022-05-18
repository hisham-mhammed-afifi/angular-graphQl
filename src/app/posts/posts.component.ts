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
  filteredPosts: any[] = [];
  sortedPosts: any[] = [];
  pages: number[] = [];
  itemsPerPage: number = 10;
  pageNum: number = 1;
  searchTerm: string = '';

  constructor(private postsSrv: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsSrv.all().subscribe(({ data: { posts } }) => {
      this.posts = posts.data;
      this.pages = this.getPages(this.posts);
      this.sortedPosts = this.sortArrASC(this.posts);

      this.paginatedPosts = this.paginate(
        [...this.sortedPosts],
        this.itemsPerPage,
        this.pageNum
      );
    });
  }

  next() {
    this.pageNum < this.pages.length
      ? this.pageNum++
      : (this.pageNum = this.pages.length);
    // for search then paginate
    this.filteredPosts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      this.sortedPosts,
      this.itemsPerPage,
      this.pageNum
    );
  }
  prev() {
    this.pageNum > 1 ? this.pageNum-- : (this.pageNum = 1);
    // for search then paginate
    this.filteredPosts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      this.sortedPosts,
      this.itemsPerPage,
      this.pageNum
    );
  }

  changePage(page: number) {
    this.pageNum = page;
    // for search then paginate
    this.filteredPosts = this.filterArr(this.posts);
    this.paginatedPosts = this.paginate(
      this.sortedPosts,
      this.itemsPerPage,
      this.pageNum
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

  sortArrASC(arr: any[]) {
    return [...arr].sort((a: any, b: any) => b.id - a.id);
  }
  sortArrDESC(arr: any[]) {
    return [...arr].sort((a: any, b: any) => a.id - b.id);
  }
  sort(value: string) {
    if (value === 'ASC') {
      this.sortedPosts = this.sortArrASC(this.posts);

      this.paginatedPosts = this.paginate(
        [...this.sortedPosts],
        this.itemsPerPage,
        this.pageNum
      );
    } else {
      this.sortedPosts = this.sortArrDESC(this.posts);

      this.paginatedPosts = this.paginate(
        [...this.sortedPosts],
        this.itemsPerPage,
        this.pageNum
      );
    }
  }

  add(post: any) {
    this.postsSrv.create(post).subscribe({
      next: (data: any) => {
        this.posts = [data.data.createPost, ...this.posts];
        this.pages = this.getPages(this.posts);
        this.sortedPosts = this.sortArrASC(this.posts);

        this.paginatedPosts = this.paginate(
          [...this.sortedPosts],
          this.itemsPerPage,
          this.pageNum
        );
      },
    });
  }
  delete(id: any) {
    this.postsSrv.delete(id).subscribe({
      next: () => {
        this.posts = [...this.posts].filter((p) => p.id !== id);
        this.pages = this.getPages(this.posts);
        this.sortedPosts = this.sortArrASC(this.posts);

        this.paginatedPosts = this.paginate(
          [...this.sortedPosts],
          this.itemsPerPage,
          this.pageNum
        );
      },
    });
  }
  update() {
    this.postsSrv.update().subscribe((data) => console.log(data));
  }

  submit(post: any) {
    this.add(post);
  }
}
