import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  errorMsg: string;
  email: string;
  forgotPasswordSubscription: Subscription;

  @Input() title: string;
  constructor(
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      this.router.navigate(['profile']);
    }
    this.initForm();
  }

  initForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmitForgotPasswordForm(): void {
    this.errorMsg = null;
    this.email = this.forgotPasswordForm.get('email').value;
    this.forgotPasswordSubscription = this.authService.forgotPassword(this.email).subscribe(
      () => {
        this.snackbarService.successSnackbar('Mail envoyé avec succès.');
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
      case 'email':
        if (this.forgotPasswordForm.controls.email.hasError('required')) {
          return 'L\' email est requis.';
        }
        if (this.forgotPasswordForm.controls.email.hasError('email')) {
          return 'L\' email n\' est pas valide.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }
}
