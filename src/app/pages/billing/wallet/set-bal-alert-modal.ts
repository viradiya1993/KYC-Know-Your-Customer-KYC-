import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export interface DialogData {
    rangeOfRequest: string;
    price: number;
}

interface NumOfEmailInputs {
    id: number;
}

@Component({
    selector: 'balance-alert-modal',
    templateUrl: './balance-alert-modal.html',
    styleUrls: ['./wallet.component.scss', '../billing.component.scss']
})
export class BalanceAlertModal {
    numOfEmailInputs: NumOfEmailInputs[] = []
    public email: string

    constructor(
        public dialogRef: MatDialogRef<BalanceAlertModal>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData[]) { }

  
    onNoClick(): void {
        this.dialogRef.close();
    }

    handleRemoveInput(id): void {
        const newInputs = this.numOfEmailInputs.filter(item => item.id !== id)
        this.numOfEmailInputs = newInputs
    }
    handleAddInput(): void {
        const nextIndex = this.numOfEmailInputs.length > 0 ? this.numOfEmailInputs[this.numOfEmailInputs.length - 1].id + 1 : 1
        this.numOfEmailInputs.push({ id: nextIndex })
    }

    onSubmit(): void {
        // event.preventDefault()        

    }
}