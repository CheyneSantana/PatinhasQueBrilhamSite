import { Component, OnInit } from '@angular/core';
import { ProdutoLoja } from 'src/Models/ProdutoLoja';
import { LojaService } from '../loja.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PatinhasService } from '../patinhas.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {
  public produtos: ProdutoLoja[] = [];

  constructor(private lojaService: LojaService,
    private toastr: ToastrManager,
    private patinhas: PatinhasService) { }

  ngOnInit() {
    this.getProdutos();
  }

  private getProdutos(): void {
    this.patinhas.executeBar = true;
    this.lojaService.getProdutos()
      .subscribe(
        data => { this.retornoGetProdutos(data); this.patinhas.executeBar = false;},
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          this.patinhas.executeBar = false;
        }
      );
  }

  private retornoGetProdutos(produtos: any): void {
    this.produtos = produtos;
  }

}
