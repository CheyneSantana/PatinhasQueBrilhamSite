import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';

@Component({
	selector: 'PopUpAvisoAdocao',
	templateUrl: 'PopUpAvisoAdocao.html',
	styleUrls: []
})
export class PopUpAvisoAdocao {
	constructor(public dialogRef: MatDialogRef<PopUpAvisoAdocao>) { }

	public fechar(): void {
		this.dialogRef.close();
	}
}