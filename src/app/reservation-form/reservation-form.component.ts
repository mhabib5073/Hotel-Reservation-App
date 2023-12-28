import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm : FormGroup = new FormGroup({});

  constructor(
    private formBuilder:FormBuilder,
    private resrvationService: ReservationService,
    private router: Router,
    private activatedRouter: ActivatedRoute){}

    ngOnInit(): void {
      this.reservationForm = this.formBuilder.group({
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        guestName: ['', Validators.required],
        guestEmail: ['', [Validators.required, Validators.email]],
        roomNumber: ['', Validators.required]
      })
      let id = this.activatedRouter.snapshot.paramMap.get('id')
      if(id){
        this.resrvationService.getReservation(id).subscribe(reservation =>{
          if(reservation)
            this.reservationForm.patchValue(reservation)
        })
      }
    }
    // Without Mock API
        //   if(id){
        //     let reservation = this.resrvationService.getReservation(id)
      
        //     if(reservation)
        //       this.reservationForm.patchValue(reservation)
        //   }
        // }
    onSubmit() {
      if(this.reservationForm.valid){
  
        let reservation: Reservation = this.reservationForm.value;
  
        let id = this.activatedRouter.snapshot.paramMap.get('id')
        if(id){
          // Update
          this.resrvationService.updateReservation(id, reservation).subscribe( () =>{
            console.log("update request processed")
          } )
        } else {
          // New
          this.resrvationService.addReservation(reservation).subscribe( () =>{
            console.log("create request processed")
          } ) 
  
        }
        // if(id){
        //   // Update
        //   this.resrvationService.updateReservation(id, reservation)
        // } else {
        //   // New
        //   this.resrvationService.addReservation(reservation)   
  
        // }
  
        this.router.navigate(['/list'])
      }
    }
    
}