import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmedValidator } from 'src/app/components/signup-form/confirmed.validator';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit, OnDestroy {

  loading: boolean;
  user: User;
  userSubscription: Subscription;
  editUser: User;
  editUserSubscription: Subscription;

  editPasswordForm: FormGroup;
  oldPassword: string;
  password: string;
  hide = true;

  @Input() title: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userSubscription = this.userService.getUserFromServer().subscribe(
      (user: User) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );

    this.initForm();

  }

  initForm(): void {
    this.editPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      passwordConfirm: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  onSubmitEditPasswordForm(): void {
    this.oldPassword = this.editPasswordForm.get('oldPassword').value;
    this.password = this.editPasswordForm.get('password').value;

    this.editUserSubscription = this.userService.editPassword(this.oldPassword, this.password).subscribe(
      (user: User) => {
        this.editUser = user;
        this.snackbarService.successSnackbar('Mot de passe modifié avec succès.');
        this.router.navigate(['profile']);
      },
      (error) => {
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
      }
    );
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'oldPassword':
        if (this.editPasswordForm.controls.oldPassword.hasError('required')) {
          return 'Le mot de passe est requis.';
        }
        if (this.editPasswordForm.controls.oldPassword.hasError('minlength')) {
          return 'Le mot de passe doit contenir minimum 6 caractères.';
        }
        if (this.editPasswordForm.controls.oldPassword.hasError('pattern')) {
          return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
        }
        break
      ;
      case 'password':
        if (this.editPasswordForm.controls.password.hasError('required')) {
          return 'Le mot de passe est requis.';
        }
        if (this.editPasswordForm.controls.password.hasError('minlength')) {
          return 'Le mot de passe doit contenir minimum 6 caractères.';
        }
        if (this.editPasswordForm.controls.password.hasError('pattern')) {
          return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
        }
        break
      ;
      case 'passwordConfirm':
        if (this.editPasswordForm.controls.passwordConfirm.hasError('required')) {
          return 'Veuillez confirmer votre mot de passe.';
        }
        if (this.editPasswordForm.controls.passwordConfirm.hasError('confirmedValidator')) {
          return 'Les mots de passes doivent être identiques.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }
  }

}
