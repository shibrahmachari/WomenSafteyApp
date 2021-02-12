import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
  
export class LocationService {
  constructor(private http: HttpClient) { }
   
  /**
   * This service provides the nearby places by initiating a get request to the mentioned api
   * @method  getNearbyPlaces()
   * @param latitude 
   * @param longitude 
   * @param place 
   */
  
  getNearbyPlaces(latitude: number, longitude: number, place: string) {
    return this.http.get('https://places.ls.hereapi.com/places/v1/discover/search?apiKey=k-KiZs5fH_IoXPI_6lsX9mcm7gVa1YJpZZh56yr1LO8' + '&at=' + latitude +','+ longitude+ '&q='+ place);
  }
  
  
  /**
   * This service allows us to send the message to registered users 
   * by initiating a POST request to the mentioned api
   * @method sendMessage()
   * @param data 
   */
  
  sendMessage(data: object) {
    return this.http.post('https://rest.nexmo.com/sms/json', data);
  }
  
  /**
   * This service sends a POST request to the ola api to book a ride for the user
   * @method bookingCab
   * @param latitude 
   * @param longitude 
   */

  bookingCab(latitude: number, longitude: number) {

   return this.http.post('https://devapi.olacabs.com/v1.5/bookings/create', {
      pickup_lat: latitude,
      pickup_lng: longitude,
      category: "share",
      pickup_mode: "now"
    }, {
      headers: new HttpHeaders({
        "authorization": "Bearer 9b16121212f12ff12f12f1f12f1f12f2",
         "x-app-token": "fd5d4d3726121212f12ff12f12f1f12f1f12fa"
      })
   })
    
  }

  
}