import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmedValidator } from 'src/app/components/signup-form/confirmed.validator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit, OnDestroy {

  loading: boolean;
  user: User;
  userSubscription: Subscription;
  editUser: User;
  editUserSubscription: Subscription;
  editUserForm: FormGroup;
  errorMsg: string;

  password: string;
  firstname: string;
  lastname: string;
  birthDate: Date;

  hide = true;

  @Input() title: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userSubscription = this.userService.getUserFromServer().subscribe(
      (user: User) => {
        this.userService.user.next(user);
        this.user = user;
        this.loading = false;

        this.editUserForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          birthDate: this.user.birthDate.substring(0, 10), // CONVERT DATE ISO FORMAT TO SIMPLE YYYY-MM-DD FORMAT
        });
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.errorMsg = error;
        this.loading = false;
      }
    );

    this.initForm();
  }

  initForm(): void {
    this.editUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    });
  }

  onSubmitEditUserForm(): void {
    this.errorMsg = null;
    this.firstname = this.editUserForm.get('firstname').value;
    this.lastname = this.editUserForm.get('lastname').value;
    this.birthDate = this.editUserForm.get('birthDate').value;

    this.editUserSubscription = this.userService.editUser(this.firstname, this.lastname, this.birthDate).subscribe(
      (user: User) => {
        this.userService.user.next(user);
        this.editUser = user;
        this.router.navigate(['profile']);
      },
      (error) => {
        this.errorMsg = error;
        console.log('Erreur ! : ' + JSON.stringify(error.error));
      }
    );
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'firstname':
        if (this.editUserForm.controls.firstname.hasError('required')) {
          return 'Le prénom est requis.';
        }
        break
      ;
      case 'lastname':
        if (this.editUserForm.controls.lastname.hasError('required')) {
          return 'Le nom est requis.';
        }
        break
      ;
      case 'birthDate':
        if (this.editUserForm.controls.birthDate.hasError('required')) {
          return 'La date de naissance est requise.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }

  onBack() {
    this.router.navigate(['profile']);
  }

  ngOnDestroy(): void {
    if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  }

}
