import { Component, OnInit, Input, HostListener, HostBinding, ElementRef } from '@angular/core';
import { TimelineSettingsModel } from '../../models/timeline-settings.model';
import { PageModel } from 'src/app/models/page.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  selectedPage: any;
  selectedIndex: number;
  paging = false;
  page = 1;
  @Input() settings: TimelineSettingsModel = {
    inactiveColor: '#aaaeb5',
    activeColor: '#0e326d',
    labelColor: '#aaaeb5',
    showLabel: true };
  @Input() data: PageModel[];

  constructor() { }

  ngOnInit() {
    this.selectedPage = this.data[0];
    this.selectedIndex = 0;
  }

  click(item, index) {
    this.selectedPage = item;
    this.selectedIndex = index;
    console.log(this.selectedPage);
  }

  getWidth(item, width) {
    const distance = this.getDistance(width);
    if (distance >= 50) {
      return 50 + (item * distance);
    } else {
      this.paging = true;
      const pos = 50 + (item * 50);
      const perpage = this.perPage(width);
      if (item < (perpage * (this.page - 1)) - 1) {
        return -100;
      }
      if (item > (perpage * (this.page)) - 1) {
        return (width + 100);
      }
      return 50 + ((item - ((this.page - 1) * (perpage - 1))) * 50);
    }
  }

  getDistance(width) {
    const useableWidth = this.getUsableWidth(width);
    return Math.floor(useableWidth / (this.data.length - 1));
  }

  getUsableWidth(width) {
    return width - 100;
  }

  maxPage(width) {
    const useableWidth = this.getUsableWidth(width);
    const distance = 50;
    return Math.ceil((distance * this.data.length) / useableWidth);
  }

  perPage(width) {
    const useableWidth = this.getUsableWidth(width);
    const distance = 50;
    return Math.ceil(useableWidth / distance);
  }

  getColor(index) {
    if (index <= this.selectedIndex) {
      return this.settings.activeColor;
    } else {
      return this.settings.inactiveColor;
    }
  }

  changePage(am) {
    this.page = this.page + am;
  }

  getTitle(index) {
    return this.data[index].title;
  }
}
