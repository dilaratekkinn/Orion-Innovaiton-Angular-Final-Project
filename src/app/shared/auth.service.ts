import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject();

  constructor() {}
  IsLoggedIn() {
    return localStorage.getItem('token');
  }
}
