import { Component, OnInit } from '@angular/core';
import { Capa } from '../../Models/Capa';
import { HomeService } from '../home.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  public capas: Capa[] = [];

  constructor(private homeService: HomeService,
    private toastr: ToastrManager,
    config: NgbCarouselConfig) {
    config.interval = 3000;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.getCapas();
  }

  private getCapas(): void {
    this.homeService.getCapas()
      .subscribe(
        data => { this.retornoGetCapas(data); },
        error => { this.toastr.errorToastr(error.error.message); }
      );
  }

  private retornoGetCapas(capas: any): void {
    this.capas = capas;
  }

}
