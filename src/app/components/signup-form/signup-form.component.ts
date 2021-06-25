import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signUpForm: FormGroup;
  msg: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  hide = true;
  loading: boolean;

  @Input() title: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      passwordConfirm: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  async onSubmitSignUpForm(): Promise<void> {
    this.msg = null;
    this.email = this.signUpForm.get('email').value;
    this.password = this.signUpForm.get('password').value;
    this.firstname = this.signUpForm.get('firstname').value;
    this.lastname = this.signUpForm.get('lastname').value;
    this.birthDate = this.signUpForm.get('birthDate').value;
    this.loading = true;
    await this.authService
      .signUp(this.email, this.password, this.firstname, this.lastname, this.birthDate)
      .then((data) => {
        this.msg = data;
        this.loading = false;
      },
      (error) => {
        this.msg = error;
        this.loading = false;
      }
      )
      .catch((errMsg: string) => (this.msg = errMsg))
    ;
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'email':
        if (this.signUpForm.controls.email.hasError('required')) {
          return 'L\' email est requis.';
        }
        if (this.signUpForm.controls.email.hasError('email')) {
          return 'L\' email n\' est pas valide.';
        }
        break
      ;

      case 'password':
        if (this.signUpForm.controls.password.hasError('required')) {
          return 'Le mot de passe est requis.';
        }
        if (this.signUpForm.controls.password.hasError('minlength')) {
          return 'Le mot de passe doit contenir minimum 6 caractères.';
        }
        if (this.signUpForm.controls.password.hasError('pattern')) {
          return 'Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre ou caractère spécial.';
        }
        break
      ;

      case 'passwordConfirm':
        if (this.signUpForm.controls.passwordConfirm.hasError('required')) {
          return 'Veuillez confirmer votre mot de passe.';
        }
        if (this.signUpForm.controls.passwordConfirm.hasError('confirmedValidator')) {
          return 'Les mots de passes doivent être identiques.';
        }
        break
      ;

      case 'firstname':
        if (this.signUpForm.controls.firstname.hasError('required')) {
          return 'Le prénom est requis.';
        }
        break
      ;

      case 'lastname':
        if (this.signUpForm.controls.lastname.hasError('required')) {
          return 'Le nom est requis.';
        }
        break
      ;

      case 'birthDate':
        if (this.signUpForm.controls.birthDate.hasError('required')) {
          return 'La date de naissance est requise.';
        }
        break
      ;

      default:
        return 'Une erreur est survenue.'
      ;
    }
  }
}


