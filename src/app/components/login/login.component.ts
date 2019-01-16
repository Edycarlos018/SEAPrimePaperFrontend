import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { FormBuilder, FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _loginForm: FormGroup;

  constructor(private _form: FormBuilder, private authService: AuthService) {
    this.createForm();

  }

  ngOnInit() {
  }

  createForm() {
    this._loginForm = this._form.group({
      userName: new FormControl,
      password: new FormControl,
    });
  }

  onSubmit() {
    this.authService.login(this._loginForm.value)
  }

}
