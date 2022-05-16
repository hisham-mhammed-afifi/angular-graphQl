import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  pages: number = 0;
  itemsPerPage: number = 10;
  pageNum: number = 1;

  constructor(private postsSrv: PostsService) {}

  ngOnInit(): void {
    this.postsSrv.all().subscribe(({ data: { posts } }) => {
      this.posts = this.paginate(posts.data, this.itemsPerPage, this.pageNum);
      this.pages = Math.floor(posts.data.length / this.itemsPerPage);
    });
    // dont do that
    this.add();
    this.delete();
    this.update();
  }

  next() {
    this.pageNum < this.pages ? this.pageNum++ : (this.pageNum = 10);
    this.posts = this.paginate(
      [...this.posts],
      this.itemsPerPage,
      this.pageNum
    );
    console.log(this.posts);
    console.log(this.pageNum);
  }
  prev() {
    this.pageNum > 0 ? this.pageNum - 1 : (this.pageNum = 1);
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
