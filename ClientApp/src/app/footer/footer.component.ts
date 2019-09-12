import { Component, OnInit } from '@angular/core';
import { Apoio } from '../../Models/Apoio';
import { FooterService } from '../footer.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public apoios: Apoio[] = []

  constructor(public footerService: FooterService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.getApoios();
  }

  private getApoios(): void {
    this.footerService.getApoios()
      .subscribe(
        data => { this.retornoGetApoios(data); },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
        }
      );
  }

  private retornoGetApoios(apoios: any): void {
    this.apoios = apoios;
  }

}
