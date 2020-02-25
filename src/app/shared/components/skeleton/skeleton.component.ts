import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  providers: [
  ]
})
export class SkeletonComponent implements OnInit {
  @Input('page') page: any;
  constructor(
  ) {
  }

  ngOnInit() {
  }
}
