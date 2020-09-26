import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApprovalPageComponent implements OnInit {
  @HostBinding('class.approval-page')
  approvalPage = true;

  constructor() {}

  ngOnInit(): void {}
}
