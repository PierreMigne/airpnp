import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../signup-form/confirmed.validator';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  password: string;
  errorMsg: string;
  email: string;
  hide = true;
  resetPasswordSubscription: Subscription;

  @Input() title: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      this.router.navigate(['profile']);
    }
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      passwordConfirm: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  onSubmitResetPasswordForm(): void {
    this.errorMsg = null;
    this.password = this.resetPasswordForm.get('password').value;
    const accessToken: string = this.location.prepareExternalUrl(this.location.path()).split('/')[2];
    localStorage.setItem('accessToken', accessToken);
    this.resetPasswordSubscription = this.userService.resetPassword(accessToken, this.password).subscribe(
      () => {
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
      case 'password':
        if (this.resetPasswordForm.controls.password.hasError('required')) {
          return 'Le mot de passe est requis.';
        }
        if (this.resetPasswordForm.controls.password.hasError('minlength')) {
          return 'Le mot de passe doit contenir minimum 6 caractères.';
        }
        if (this.resetPasswordForm.controls.password.hasError('pattern')) {
          return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
        }
        break
      ;
      case 'passwordConfirm':
        if (this.resetPasswordForm.controls.passwordConfirm.hasError('required')) {
          return 'Veuillez confirmer votre mot de passe.';
        }
        if (this.resetPasswordForm.controls.passwordConfirm.hasError('confirmedValidator')) {
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
    if (this.resetPasswordSubscription) {
      this.resetPasswordSubscription.unsubscribe();
    }
  }

}
