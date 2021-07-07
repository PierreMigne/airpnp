import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

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

  pageSlice: Array<User>;
  loading: boolean;
  // urlServer = environment.urlServer + 'properties/uploads/';
  displayedColumns: string[] = ['id', 'email', 'role'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private snackbarService: SnackbarService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.roles = ['USER', 'ADMIN'];
    this.initSubscription();
  }

  initSubscription(): void {
    this.loading = true;
    this.usersSubscription = this.userService.getAllUsersAndAdminsFromServer().subscribe(
      (users: Array<User>) => {
        this.users = users;
        // const index = this.roles.indexOf(this.users.role);
        this.pageSlice = this.users.slice(0, 5);
        this.dataSource = new MatTableDataSource<User>(this.pageSlice);

        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmitEditUserRoleForm(id: number, role: string): void {
    if (!role) { return; }
    this.editUserRoleSubscription = this.userService.editUserRole(id, role).subscribe(
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

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.users.length) {
      endIndex = this.users.length;
    }
    this.pageSlice = this.users.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource<User>(this.pageSlice);
  }

  onSortingPage(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    if (this.editUserRoleSubscription) {
      this.editUserRoleSubscription.unsubscribe();
    }
  }
}
