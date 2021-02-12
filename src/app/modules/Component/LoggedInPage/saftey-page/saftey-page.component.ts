import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { LocationService } from 'src/app/Services/location.service';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { NgForm } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

declare const annyang: any;
@Component({
  selector: 'app-saftey-page',
  templateUrl: './saftey-page.component.html',
  styleUrls: ['./saftey-page.component.css'],
})



export class SafteyPageComponent implements OnInit {
  showWebcam: boolean = false;
  isCameraExist = true;
  webcamImage!: WebcamImage ;
  errors: WebcamInitError[] = [];
  images: Array<WebcamImage>=[];
  latitude!: number;
  longitude!: number;
  geocoder: any;
  services!: google.maps.places.PlacesService;
  map!: google.maps.Map;
  placename: string = "police station";
  lat: any;
  lng: any;
  nearbyPlaces: any;
  secretKey!: string;
  alert: boolean = false;
  recording: boolean = true;
  disable: boolean = false;
  disablestop: boolean = true;
  success: boolean = false;
  successstop: boolean = false;
  blobUrl!: any;
  driverNumber: number = 9968844919 /**dummy data */
  driverName: string = "Ram"
  otp: number = 4198;
  time: number = 5;
  val!: string;
  emergency: boolean = true;
  robber: boolean = false;
  murder: boolean = false;
  location: boolean = false;
  registeredContacts!: number[];
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
  voiceText: any;
  speech!: any;
 


  @ViewChild('audio', { static: true }) audioPlayerRef!: ElementRef;
  @ViewChild('gmap') gmapElement!:ElementRef;
  @ViewChild('input') InputElement!: ElementRef;
  @ViewChild('select') SelectElement!: ElementRef;
  
      // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocationService,
    private audioRecorderService: NgAudioRecorderService,
    private authService: AuthService,
  
    
  ) {
    
    this.audioRecorderService.recorderError.subscribe((error: any) => {
      alert(error);
    })

    //this.speechservice.initializeVoiceRecognitionCallback();
  }

  
  //initializing the voice regonisier
  initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err: any) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid: any[]) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;
      this.speech = this.voiceText;
      
      if (this.speech === 'Murder') {
        this.murder = true;
        this.emergency = false;
        this.robber = false;
        this.location = false;
        this.SelectElement.nativeElement.value = 'Murderer';
      }
      else if (this.speech === 'emergency attack') {
        this.murder = false;
        this.emergency = true;
        this.robber = false;
        this.location = false;
        this.SelectElement.nativeElement.value = 'Emergency Attack';
      }
      else if (this.speech === 'robbery') {
        this.murder = false;
        this.emergency = false;
        this.robber = true;
        this.location = false;
        this.SelectElement.nativeElement.value = 'Robbery';
      }
      else if (this.speech === 'location' ) {
        this.murder = false;
        this.emergency = false;
        this.robber = false;
        this.location = true;
        this.SelectElement.nativeElement.value = 'Location Saftey';
      }

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
  }
  
  //handles voice regonition ensures the voice is recorded
  startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = '';

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
     
		}
	}

  closeVoiceRecognition(): void {
    
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = '';
    
		if(annyang){
      annyang.abort();
    }
	}

  ngOnInit(): void {
    
    //fetching the current location: (latitude and longitude)
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geocoder = new google.maps.Geocoder;

    });
     
     //intializing the webcam
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    });
    
  }
  
  //trigger to capture the image
  takeSnapshot(): void {
    this.trigger.next();
  }
   
  //handles the on off of the camera
  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  //handling initialization errors
  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }
  
  //changing the direction of the camera
  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }
  
  //handling the captured image
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.images.push(this.webcamImage);
    console.log(this.images);
    this.authService.savingtoDashboard(this.images);
    this.authService.fetchingData().subscribe((res: any) => {
      console.log(res);
  
    },(err:any)=>{
      console.log(err);
    })
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  //finds the current location of the user
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
       
        //plots the location on the map- google maps api doesn't work in absence of a billing account
       this.map = new google.maps.Map(this.gmapElement.nativeElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });

        // using another api to fetch the data of nearby police stations 
        this.locationService.getNearbyPlaces(this.latitude, this.longitude, "policestation").subscribe(
          (res: any) => {
            console.log(res);
            this.nearbyPlaces = res.results.items;
            console.log("e", this.nearbyPlaces);
            
          }, (err: any) => {
            console.log(err);
        })
      });
    }
  }

  
  capture() {
    this.showWebcam = true;
  }

  closecamera() {
    this.showWebcam = false;
  }

  //handling the stop recording, only if the user submits a vald
  //password the stop recording button gets 
  //enabled

  onSubmit(form: NgForm) {
    const result = this.authService.getSecretKey();
    console.log("ee", result);
    if (this.InputElement.nativeElement.value === result) {
      this.disable = false;
      this.disablestop = false;
      this.InputElement.nativeElement.value = '';
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 800);
    } else {
      this.InputElement.nativeElement.value = '';
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 1000);
     }
  }

  OnPlay() {
    this.audioPlayerRef.nativeElement.play();
  }

  // handles the start recording 
  start() {
    this.audioRecorderService.startRecording();
    this.recording = false;
    const result = this.authService.getSecretKey();
    console.log("result", result);
  }


  //handles the stop recording 
  stopAudio() {
    
      this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB_URL).then((output) => {
        console.log("url", output);
        this.blobUrl = output;
        this.successstop = true;
        alert('Recording Stopped. Audo URl' + this.blobUrl + 'was sent to registered contacts');
      }).catch(errrorCase => {
        // Handle Error
      });
  
    this.recording = true;
    this.InputElement.nativeElement.value = '';
  }
  

  //uses the api to send messages to registered contacts of the user
  MessageFamily() {
    console.log(this.latitude);
    console.log("thus" + this.latitude);
    const message = "Please Help Me i am in Danger!!! My location is Lat:" + this.latitude + ",Lng" + this.longitude ;
    console.log(message);

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS'],
      'Access-Control-Allow-Origin': '*https://rest.nexmo.com/sms/json'
    }

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    
    this.authService.fetchingData().subscribe((res: any) => {
      this.registeredContacts = res;
    }, (err: any) => {
      console.log(err);
     })
    const request = {
      
      "api_key": "70d7fd21",  //api key for authorization
      "api_secret": "JRP9QR5BtwlRz3l1", //api_secret key for authorization
      "from": "+919968844919", //number of the sending user
      "to" :"+919868137125", // can be a array of numbers to be sent to
      "text": message, // the automated message to be sent
      
    }
    
    //the service for making a request to message api
    this.locationService.sendMessage(request).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })


  }
  

  //handles the booking of ola app using the ola api
  bookOla() {
    this.locationService.bookingCab(this.latitude, this.longitude).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }

  Moves() {
    console.log(this.speech);
  }
  
  //this handles the suggestions to be displayed when the user is in a specific emergency
  selected() {
    console.log(this.SelectElement.nativeElement.value);
    if (this.SelectElement.nativeElement.value === 'Emergency Attack') {
      this.emergency = true;
      this.murder = false;
      this.robber = false;
      this.location = false;
    } else if (this.SelectElement.nativeElement.value === 'Robbery') {
      this.emergency = false;
      this.murder = false;
      this.robber = true;
      this.location = false;
    } else if (this.SelectElement.nativeElement.value === 'Murderer') {
      this.emergency = false;
      this.murder = true;
      this.robber = false;
      this.location = false;
    } else if (this.SelectElement.nativeElement.value === "Location Saftey") {
      this.emergency = false;
      this.murder = false;
      this.robber = false;
      this.location = true;
    }
  }

}


