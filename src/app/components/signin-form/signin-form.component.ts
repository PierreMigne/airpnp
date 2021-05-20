import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  signInForm: FormGroup;
  errorMsg: string;
  email: string;
  password: string;
  hide = true;

  @Input() title: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
    });
  }

  async onSubmitSignInForm() {
    this.errorMsg = null;
    await this.authService
      .signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
      .then((data) => {
        this.errorMsg = data;
      },
      (error) => {
        this.errorMsg = error;
      }
      )
      .catch((errMsg: string) => (this.errorMsg = errMsg))
    ;
  }

  getErrorMessage(type: string): string {
    if (type === 'email') {
      if (this.signInForm.controls.email.hasError('required')) {
        return 'L\' email est requis.';
      }
      if (this.signInForm.controls.email.hasError('email')) {
        return 'L\' email n\' est pas valide.';
      }
    }
    if (type === 'password') {
      if (this.signInForm.controls.password.hasError('required')) {
        return 'Le mot de passe est requis.';
      }
      if (this.signInForm.controls.password.hasError('minlength')) {
        return 'Le mot de passe doit contenir minimum 6 caractères.';
      }
      if (this.signInForm.controls.password.hasError('pattern')) {
        return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
      }
    }
  }
}
