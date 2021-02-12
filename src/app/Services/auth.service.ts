import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebcamImage } from 'ngx-webcam';




@Injectable({ providedIn: 'root' })
  

export class AuthService {
  key!: string;
  constructor(private http:  HttpClient)
  {
    
  }

  /**
   * Registering a user
   * @method signUpMethod
   * @param email 
   * @param password 
   */
  signUpMethod(email: string, password: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoH-5JUAmWxruAjLvManUI94ZHqVJcG2o', {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  /**
   * Logining in a user
   * @method signInMethod
   * @param email 
   * @param password 
   */

  signInMethod(email: string, password: string) {
    return this.http.post<LoginResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoH-5JUAmWxruAjLvManUI94ZHqVJcG2o',
      {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
  
  provideSecretKey(secret: string) {
    this.key = secret;
    console.log("key", this.key);
  }

  getSecretKey() {
    return this.key;
  }
  
  /**
   * saving the captured images on firebase
   * @param images 
   */

  savingtoDashboard(images: WebcamImage[]) {
   this.http.put('https://test-da6f9-default-rtdb.firebaseio.com/image.json', images).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    }) 
  }

  /**
   * displaying the images on the dashboard
   */
  fetchingData() {
    return this.http.get('https://test-da6f9-default-rtdb.firebaseio.com/image.json');
  }

 /**
  * saving registered contacts
  * @param contact 
  */
  savecontact(contact: number[]) {
    return this.http.put('https://test-da6f9-default-rtdb.firebaseio.com/contacts.json', contact).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }
  
  fetchContact() {
    return this.http.get('https://test-da6f9-default-rtdb.firebaseio.com/contacts.json');
  }

}

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

export interface LoginResponseData {
  idToken: string,
  email: string,
  refereshToken: string,
  expiresIn: string,
  localId: string,
  registered: string
}