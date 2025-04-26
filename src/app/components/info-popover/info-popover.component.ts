import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-info-popover',
  templateUrl: './info-popover.component.html',
  styleUrls: ['./info-popover.component.scss'],
  imports: [IonContent]
})
export class InfoPopoverComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
