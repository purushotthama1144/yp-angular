import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-lead-generation-form',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './lead-generation-form.component.html',
  styleUrl: './lead-generation-form.component.scss'
})

export class LeadGenerationFormComponent {

  registrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')
    ]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]),
    schoolName: new FormControl('', Validators.required),
    board: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    comments: new FormControl(''),
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }


  @Input() schedule_call: boolean | undefined;
  @Output() scheduleCallStatusChanged = new EventEmitter<any>();

  notifyParent() {
    this.scheduleCallStatusChanged.emit(false);
  }

  // @HostListener('window:click', ['$event'])
  // onWindowClick(event: Event) {
  //   const target = event.target as HTMLElement;
  //   if (target.classList.contains('active-schedule')) {
  //     this.schedule_call = false;
  //   } 
  // }
}