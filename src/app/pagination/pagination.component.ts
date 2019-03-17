import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() demoList: Object[];
  @Input() icons: boolean;
  @Input() length: number;
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  activePage = [];

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePage = this.demoList.slice(firstCut, secondCut);
  }

  ngOnInit(): void {
    this.activePage = this.demoList.slice(0,this.pageSize);
  }
}
