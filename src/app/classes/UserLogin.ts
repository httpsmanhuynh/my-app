import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export class UserLogin {
  constructor(
    public username: string = '',
    public password: string = '',
    public rememberMe: boolean = false,
  ) {}
}
