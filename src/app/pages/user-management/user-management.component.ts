import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  TemplateRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import 'base-frontend/build-dist/lib/user-module/user-dashboard'
import 'base-frontend/build-dist/components/loader/loader'
import { cleanFormValues } from 'src/app/util/formatter';
import { StorageService } from 'src/app/services/storage.service';
import SnackBar from 'src/app/components/snackbar/snackbar';
import { SrmUserTypeEnum } from 'src/app/models/config';
import { PRODUCT_ID } from 'src/app/util/constants';
import { UserCreationService } from 'src/app/services/user-creation.service';
import { LINKTYPES, SnackbarType } from 'src/app/models/enums.model';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { userManagementConfig } from 'src/app/app-config/user-management-config';
import { ConfigService } from 'src/app/services/config-push.service';

@Component({
  selector: 'user-management-component',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  defaultDispplay: 'table' | 'grid' = 'table';
  roles = userManagementConfig.roles;
  userDatas = userManagementConfig.data;
  tableLabel = userManagementConfig.tableLabel;
  dataDetail = userManagementConfig.metadata;
  openCreateUserModal = false;
  currentOpenModalType: LINKTYPES;
  formStructure: any;
  preFilledValues: { userId?: string };
  showLoader: boolean = false;
  modalRef: BsModalRef;
  productId = PRODUCT_ID;
  snackBar = new SnackBar();
  formHeader: string;
  formType:any=LINKTYPES.CREATE_USER;
  editing:boolean = false;
  creating:boolean = false;
  orgId:any=null;
  branchId:any=null;
  lang: string = 'en';
  disabledControls:any;
  createBtnText:any = "Create User";
  editBtnText:any = "Edit User";
  primaryColor:string="";
  formExternalLinkHeaders = {};
  hideUserGroupDashboard = false;

  @ViewChild('createUserPopup', { static: false }) createUserPopup: ElementRef;
  @ViewChild('template', { static: false }) template: ElementRef;
  @ViewChildren('formPreview') formPreview: QueryList<any>;
  constructor(
    private routeEvent: RoutingEventService,
    private configService: ConfigService,
    private renderer: Renderer2,
    private modalService: BsModalService,
    private storageService:StorageService,
    private userCreationService: UserCreationService,
    private translate: TranslateService
  ) {
    this.primaryColor = "#15C5F8";
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        this.createUserPopup &&
        !this.createUserPopup.nativeElement.contains(e.target)
      ) {
        this.openCreateUserModal = false;
      }
    });
  }


  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }): void {
    this.routeEvent.goto(detail.type);
  }

  openCreateUserForm(event: any): void {
    const { type, user } = event.detail;
    if (user) {
      const roles = user.roles || [];
      user.productRoles = roles.reduce((allRoles, { name }) => {
        if (name) {
          return [...allRoles, name];
        }
        return allRoles;
      }, []);
    }
    this.translate.use(this.translate.currentLang).subscribe(() => {
      this.lang = this.translate.currentLang;
    });

    this.formHeader = type === LINKTYPES.CREATE_USER ? this.translate.instant('createHeader') : this.translate.instant('editHeader');
    this.createBtnText = this.translate.instant('createBtn');
    this.editBtnText = this.translate.instant('editBtn');
    this.formType = type;

    this.showLoader = true;
    this.formStructure=null;
    if(!this.orgId){
      this.configService.getProductFormType(this.productId, LINKTYPES.CREATE_USER_ORG)
      .subscribe(
        (result) => {
          if (result.code == 0) {
            this.formStructure = JSON.parse(result.formData.config);
            this.showLoader = false;
            this.openCreateUserModal = true;
            this.modalRef = this.modalService.show(this.template,{class: 'custom-modal modal-dialog-centered modal-lg'});
            this.currentOpenModalType = type;
            this.preFilledValues = user || {};
          }
        }, (error) => {
          //Error here
          this.showError(error);
          this.showLoader = false;
        }
      )
    }else if(!this.branchId){
      this.configService
      .getProductFormType(this.productId, LINKTYPES.CREATE_USER_ORG)
      .subscribe(
        (result) => {
          if (result.code == 0) {
            this.disabledControls = ['orgId'];
            this.preFilledValues = {...user,orgId:this.orgId}|| {orgId:this.orgId};
            this.formStructure = JSON.parse(result.formData.config);
            this.userCreationService.getAllOrgs().subscribe(res=>{
            })
            // if(this.orgId){
            //   this.userCreationService.getOrgBranch(this.orgId).subscribe(res=>{
            //   })
            // }

            this.showLoader = false;
            this.openCreateUserModal = true;
            this.modalRef = this.modalService.show(this.template,{class: 'custom-modal modal-dialog-centered modal-lg'});

            this.currentOpenModalType = type;
          }
        }, (error) => {
          //Error here
          this.showError(error);
          this.showLoader = false;
        }
      )
    }else{
      this.configService
      .getProductFormType(this.productId, LINKTYPES.CREATE_USER)
      .subscribe(
        (result) => {
          if (result.code == 0) {
            this.formStructure = JSON.parse(result.formData.config);
            this.showLoader = false;
            this.openCreateUserModal = true;
            this.modalRef = this.modalService.show(this.template,{class: 'custom-modal modal-dialog-centered modal-lg'});
            this.currentOpenModalType = type;
            this.preFilledValues = user || {};
          }
        }, (error) => {
          //Error here
          this.showError(error);
          this.showLoader = false;
        }
      )
    }
  }

  closeCreateUserModal(event: Event) {
    event.stopPropagation();
    this.openCreateUserModal = false;
  }

  getFormValues(event) {
    // remove invalids
    const userData = cleanFormValues(event);

    //save object just in case of fail request
    this.preFilledValues = { ...this.preFilledValues, ...userData };

    if (this.currentOpenModalType === LINKTYPES.CREATE_USER) {
      this.saveUser(userData);      
    } else {
      this.updateUser(userData);
    }
  }

  saveUser(userData) {
    this.creating = true;
    this.userCreationService.createUser({...userData,branchId:this.branchId||userData.branchId,orgId:this.orgId||userData.orgId}, this.productId).subscribe(
      (result) => {
        this.creating = false;
        if (result.code === 0) {
          this.modalRef.hide();
          this.showSuccess(result);
          this.dispatchReloadEvent();
        } else {
          this.creating = false;
          //Error here
          this.showError(result);
          return;
        }
      },
      (error) => {
        this.creating = false;
        this.showError(error);
        this.showLoader = false;
      }
    );
  }

  updateUser(userData) {
    this.editing = true;
    this.userCreationService
      .updateUser({...userData,branchId:this.branchId||userData.branchId,orgId:this.orgId||userData.orgId}, this.preFilledValues.userId, this.productId)
      .subscribe(
        (result) => {
          this.showLoader = false;
          if (result.code === 0) {
            this.editing = false;
            this.modalRef.hide();
            this.showSuccess(result);
            this.dispatchReloadEvent();
          } else {
            //Error here
            this.editing = false;
            this.showError(result);

            return;
          }
        },
        (error) => {

          this.editing = false;
          this.showError(error);
          this.showLoader = false;
        }
      );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  showError(error) {
    this.snackBar.create({
      text: error.description || error.message,
      duration: 7000,
      type: SnackbarType.DANGER,
    });
  }

  // openBulkCreateUserModal({
  //   detail,
  // }: {
  //   detail: { type: LINKTYPES; value: boolean };
  // }): void {
  //   if (detail && detail.value) {
  //     this.modalRef = this.modalService.show(BulkCreateComponent, {
  //       class: 'modal-dialog-centered modal-lg',ignoreBackdropClick:true
  //     });

  //     this.modalRef.content.close.subscribe((res)=>{
  //       if(res){
  //         this.modalRef.hide();
  //         this.dispatchReloadEvent();
  //       }
  //     });
  //   }
  // }

  showSuccess(response) {
    this.snackBar.create({
      text: response.description || 'Success',
      duration: 7000,
      type: SnackbarType.SUCCESS,
    });
  }

  dispatchReloadEvent() {
    window.dispatchEvent(
      new CustomEvent('reload-user-management', {
        detail: { value: true, from: LINKTYPES.CREATE_USER },
        bubbles: true,
        composed: true,
      })
    );
  }

  ngOnInit(): void {
    this.formExternalLinkHeaders = this.storageService.getFormCaptureExternalLinkHeaders();
    
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.translate.use(this.translate.currentLang).subscribe(() => {
      this.lang = this.translate.currentLang;
    });
    this.orgId = this.storageService.getUserOrg();
    this.branchId = this.storageService.getUserBranch();
    const currentUserCategory = this.storageService.getProductUserCategoryName()?.toUpperCase();
    this.hideUserGroupDashboard = currentUserCategory === SrmUserTypeEnum.PRODUCT_ADMIN;
  }

  gotoRoleManagement(_event: any ) {
    this.routeEvent.goto(LINKTYPES.ROLE);
  }

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
