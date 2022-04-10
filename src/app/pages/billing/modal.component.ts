import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { StorageService } from 'src/app/services/storage.service';

export interface DialogData {
    band_name: string,
    band_limit: string,
    band_price: string,
    band_min_units: string,
    band_max_units: string,
}

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal-dialog.html',
    styleUrls: ['./billing.component.scss']
})
export class RequestModal implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RequestModal>, public globalFunctionsService: GlobalFunctionsService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData[]) { }

    ngOnInit(): void {
        this.globalFunctionsService.exitIntroJS();
        let tourRunning = false;
        const isTourRunning = StorageService.getItem('isTourRunning');
        if (isTourRunning !== undefined && isTourRunning == 'true') {
            tourRunning = true;
        }
        if (tourRunning === true) {
            setTimeout(() => {
                this.globalFunctionsService.initIntro();
                this.globalFunctionsService.goToStep(13);
            }, 1000)

        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}

