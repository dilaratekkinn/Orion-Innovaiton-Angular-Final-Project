import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  public adminForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  adminLogin() {
    this.http.get<any>('http://localhost:3000/adminUsers').subscribe((res) => {
      const admin = res.find((a: any) => {
        return (
          a.email === this.adminForm.value.email &&
          a.password === this.adminForm.value.password
        );
      });
      if (admin) {
        
        //  localStorage.setItem('admin', JSON.stringify(admin));
        //  this.auth.admin.next(true);
        alert(' Admin Girişi Başarılı');
        this.adminForm.reset();
        localStorage.setItem('dilara',JSON.stringify(admin))
        this.router.navigate(['/adminpanel']);
      } else {
        alert('Admin Değilsiniz!');
      }
    });
  }
}
