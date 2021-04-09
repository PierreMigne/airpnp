import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signUpForm: FormGroup;
  errorMsg: string;
  email: string;
  password: string;
  hide = true;

  @Input() title: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      passwordConfirm: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  async onSubmitSignUpForm() {
    this.errorMsg = null;
    await this.authService
      .signIn(this.signUpForm.get('email').value, this.signUpForm.get('password').value)
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
      if (this.signUpForm.controls.email.hasError('required')) {
        return 'L\' email est requis.';
      }
      if (this.signUpForm.controls.email.hasError('email')) {
        return 'L\' email n\' est pas valide.';
      }
    }
    if (type === 'password') {
      if (this.signUpForm.controls.password.hasError('required')) {
        return 'Le mot de passe est requis.';
      }
      if (this.signUpForm.controls.password.hasError('minlength')) {
        return 'Le mot de passe doit contenir minimum 6 caractères.';
      }
      if (this.signUpForm.controls.password.hasError('pattern')) {
        return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
      }
    }
    if (type === 'passwordConfirm') {
      if (this.signUpForm.controls.passwordConfirm.hasError('required')) {
        return 'Veuillez confirmer votre mot de passe.';
      }
      if (this.signUpForm.controls.passwordConfirm.hasError('confirmedValidator')) {
        return 'Les mots de passes doivent être identiques.';
      }
    }
  }
}
