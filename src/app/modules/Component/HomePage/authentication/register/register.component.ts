import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  userNumber!: number;
  password!: string;
  phoneStatus: boolean=false
  editstatus: boolean = false
  loginmode: boolean = true;
  contacts = [
    9868137125, 9968844919, 123456789
  ];
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * this method validates the mobile number to be of 10 digits
   * @param phone 
   */
  
  onUpdate(phone: any) {
    console.log(phone)
    if (phone.target.value.length < 10) {
      this.phoneStatus = false;
    }

    if (phone.target.value.length === 10) {
      this.phoneStatus = true;
    }
  }
  
  /**
   * this method is responsible for registering the user using the firebase authorization api
   * @method onSubmit
   * @param form 
   */

  onSubmit(form: NgForm) {
    console.log(form);
    this.userEmail = form.value.email;
    this.password = form.value.password;
    
    // this.contacts.push(form.value.mobilenumber1);
    // this.contacts.push(form.value.mobilenumber2);
    // this.contacts.push(form.value.mobilenumber3);
    // this.contacts.push(form.value.mobilenumber4);
    // this.contacts.push(form.value.mobilenumber5);

    this.authService.signUpMethod(this.userEmail, this.password).subscribe((res: any) => {
      console.log("result", res);
      this.router.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
    })
     
    this.authService.savecontact(this.contacts);

   }
}
