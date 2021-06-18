import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-give-admin-access',
  templateUrl: './give-admin-access.component.html',
  styleUrls: ['./give-admin-access.component.scss']
})
export class GiveAdminAccessComponent implements OnInit, OnDestroy {

  roles: string[];

  users: Array<User>;
  usersSubscription: Subscription;

  editedUser: User;
  editUserRoleSubscription: Subscription;

  editUserRoleForm: FormGroup;

  pageSlice: Array<User>;
  loading: boolean;
  // urlServer = environment.urlServer + 'properties/uploads/';
  displayedColumns: string[] = ['id', 'email', 'roles', 'rolesDefine'];
  dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService, private snackbarService: SnackbarService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.roles = ['USER', 'ADMIN', 'SUPERADMIN'];
    this.initForm();
    this.initSubscription();
  }

  initForm(): void {
    this.editUserRoleForm = this.formBuilder.group({
      role: ['', [Validators.required]],
    });
  }
  initSubscription(): void {
    this.loading = true;
    this.usersSubscription = this.userService.getAllUsersFromServer().subscribe(
      (users: Array<User>) => {
        this.users = users;
        // const index = this.roles.indexOf(this.users.role);
        this.pageSlice = this.users.slice(0, 5);
        this.dataSource = new MatTableDataSource<User>(this.pageSlice);

        this.editUserRoleForm.setValue({
          role: this.roles[0],
        });

        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onSubmitEditUserRoleForm(id: number): void {
    this.editUserRoleSubscription = this.userService.editUserRole(id, this.editUserRoleForm.value.role).subscribe(
      (user: User) => {
        this.editedUser = user;
        this.snackbarService.successSnackbar('Rôle modifié avec succès.');
        this.initSubscription();
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
      }
    );
  }

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) {
      endIndex = this.users.length;
    }
    this.pageSlice = this.users.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<User>(this.pageSlice);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    if (this.editUserRoleSubscription) {
      this.editUserRoleSubscription.unsubscribe();
    }
  }
}
