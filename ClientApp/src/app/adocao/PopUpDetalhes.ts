import { KdAdulto, KdSexo } from 'src/Models/AnimaisAdocao';
import { Inject, Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdocaoService } from '../adocao.service';
import { AnimaisAdocao, KdAtivo, KdVermifugado, KdPorte } from '../../Models/AnimaisAdocao';

@Component({
	selector: 'PopUpDetalhes',
	templateUrl: 'PopUpDetalhes.html',
	styleUrls: ['./PopUpDetalhes.scss']
})
export class PopUpDetalhes implements OnInit {
	public animal: AnimaisAdocao;
	public KdAtivo = KdAtivo;
	public KdVermifugado = KdVermifugado;
	public KdPorte = KdPorte;
	public KdAdulto = KdAdulto;
	public KdSexo = KdSexo;

	constructor(private adocaoService: AdocaoService,
		private toastr: ToastrManager,
		public dialogRef: MatDialogRef<PopUpDetalhes>,
		@Inject(MAT_DIALOG_DATA) public data: AnimaisAdocao) { }

	public fechar(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.animal = this.data;
	}
}
