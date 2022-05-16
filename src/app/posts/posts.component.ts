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

  constructor(private postsSrv: PostsService) {}

  ngOnInit(): void {
    this.postsSrv.all().subscribe(({ data: { posts } }) => {
      this.posts = posts.data;
      this.pages = [
        ...Array(Math.floor(posts.data.length / this.itemsPerPage)).keys(),
      ].map((k) => k + 1);
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
    this.pageNum < this.pages.length ? this.pageNum++ : (this.pageNum = 10);
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      this.pageNum
    );
  }
  prev() {
    this.pageNum > 1 ? this.pageNum-- : (this.pageNum = 1);
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      this.pageNum
    );
  }

  changePage(page: number) {
    this.pageNum = page;
    this.paginatedPosts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      page
    );
  }

  paginate(items: Array<any>, itemsPerPage: number, pageNum: number) {
    const idx = (pageNum - 1) * itemsPerPage;
    return items.slice(idx, idx + itemsPerPage);
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
