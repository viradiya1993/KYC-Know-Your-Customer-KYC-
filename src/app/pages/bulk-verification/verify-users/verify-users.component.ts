import { Component, OnInit } from '@angular/core';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BulkWrapperService } from '../../../models/enums.model';
import { AppConst } from '../../../app.constant';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from '../../../services/global-functions.service';
import { StorageService } from '../../../services/storage.service';
import { TransactionHistory } from 'base-frontend-components/dist/src/table/bfc-table';

@Component({
  selector: 'app-verify-users',
  templateUrl: './verify-users.component.html',
  styleUrls: ['./verify-users.component.scss']
})
export class VerifyUsersComponent implements OnInit {
  bulkStep: string;
  bulkServices: BulkWrapperService[];
  selectedService: BulkWrapperService;
  allowedExtenssion: string[];
  isAllowed: boolean;
  userdata: any;
  constructor(private wrapperService: WrapperServiceService, private router: Router,
    private globalFunctionsService: GlobalFunctionsService, private http: HttpClient, private storageService: StorageService) { }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.bulkStep = 'initialStep';
    this.allowedExtenssion = AppConst.BULK_FILE_UPLOAD_ALLOWED_EXTE;
    this.getBulkWrapperServives();
  }
  
  goToSecondStep(what: string): void {
    this.bulkStep = what;
  }

  getBulkWrapperServives(): void {
    const params = new HttpParams();
    const bodyData = {
      baseuserid: this.userdata.user.id
    };
    this.wrapperService.getAllBulkWraperServices(params, bodyData).subscribe(result => {
      this.bulkServices = result.wrapperService.wrapperService;
    });
  }
  
  selectBulkService(service: BulkWrapperService): void {
    if (service.isLive === true) {
      this.selectedService = service;
    }
  }

  downloadTemplate(): void {
    const params = new HttpParams();
    const bodyData = {
      wrapperPk: this.selectedService.pk
    };
    // call the download API.
    this.wrapperService.getBulkTemplate(params, bodyData).subscribe(result => {
      const filename = this.selectedService.name + '.xlsx';
      this.globalFunctionsService.openDownload(result.base64, filename, 'xlsx');
      setTimeout(() => {
        this.bulkStep = 'upload';
      }, 1000);
    });
  }

  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.files = [];
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.files = [];
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      const fileExtension: string = '.' + item.name.split('.').pop();
      if (this.allowedExtenssion.includes(fileExtension)) {
        this.isAllowed = true;
        this.files.push(item);
      } else {
        this.isAllowed = false;
      }
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  bulkVerificationIdService(): void {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    // this.router.navigate(['/bulk-verification/verify-users/result']);
  }
  
  _handleReaderLoaded(readerEvt): void {
    const binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    const params = new HttpParams();
    const bodyData = {
      base64: base64textString,
      wrapperFk: this.selectedService.pk,
      baseuserid: this.userdata.user.id,
    };
    
    this.wrapperService.verifyBulkRecords(params, bodyData).subscribe(result => {
      const repsonseCardData = {
        keyfrom: 'bulk-verification',
        requestData: {
          wrapperData: {
            wrapperId: this.selectedService.pk,
            name: this.selectedService.name,
          }
        },
        bulkJobId: result.bulkUpload.bulkJobId
      };
      sessionStorage.setItem('responseData', JSON.stringify(repsonseCardData));
      this.router.navigate(['/bulk-verification/verify-users/result']);
    });
  }
}
