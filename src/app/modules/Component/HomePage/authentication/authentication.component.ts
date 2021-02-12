
import { NgForm } from '@angular/forms';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  userName!: string;  /**username */
  userEmail!: string; /**useremail */
  password!: string; /**user password */
  secretkey!: string; /**secret key which will be used in voice recording later in the app */


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }
  
  /**
   *  method to authenticate the user when he logs in 
   * @method onSubmit
   * @param form 
   */
  onSubmit(form: NgForm) {
    
    if (!form.valid) {
      return;
    }
    
    this.authService.provideSecretKey(this.secretkey);
    console.log(this.secretkey);
    this.userName = form.value.username;
    this.userEmail = form.value.email;
    this.password = form.value.password;

    this.authService.signInMethod(this.userEmail, this.password).subscribe((res: any) => {
      
      console.log("Logged In", res);
      /**if the credentials are correct then routed to another link */
      this.router.navigate(['/womensaftey']);
    }, (err: any) => {
      console.log(err);
    })
    
  }
  
}



