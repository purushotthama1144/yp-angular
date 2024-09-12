import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { ErrorStateMatcher, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { LeadGenerationService } from '../../service/lead-generation.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-lead-generation-form',
  standalone: true,
  providers: [ provideNativeDateAdapter() , { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [CommonModule , MatFormFieldModule, MatInputModule, ReactiveFormsModule ,  MatDatepickerModule , MatInputModule , MatSelectModule ],
  templateUrl: './lead-generation-form.component.html',
  styleUrl: './lead-generation-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LeadGenerationFormComponent {
  startDate = "";
  endDate = "";
  minDate = moment().toDate();

  boards = [
    'State', 'CBSE' , 'IB', 'ICSE', 'Others'
  ]

  availableSlots = [
    '10AM to 11AM',
    '11AM to 12PM',
    '12PM to 01PM',
    '1PM to 02PM',
    '02PM to 03PM',
    '03PM to 04PM',
    '04PM to 05PM',
    '05PM to 06PM',
    '06PM to 07PM',
  ]

  disabledDates = [
    new Date(2024, 8, 15), // September 15, 2024
    new Date(2024, 8, 16), // September 16, 2024
    new Date(2024, 8, 20)  // September 20, 2024
  ];

  // Disable specific dates
  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return !this.disabledDates.some(disabledDate =>
      disabledDate.getFullYear() === date.getFullYear() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getDate() === date.getDate()
    );
  };

  @Input() schedule_call: boolean | undefined;
  @Output() scheduleCallStatusChanged = new EventEmitter<boolean>();
  
  registrationForm = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')
    ]),
    last_name: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]),
    school_name: new FormControl('', Validators.required),
    board: new FormControl('', Validators.required),
    city: new FormControl(''),
    state: new FormControl(''),
    designation: new FormControl(''),
    comments: new FormControl(''),
    selected_date: new FormControl('', Validators.required),
    time_slot: new FormControl('', Validators.required),
  });


  // registrationForm = new FormGroup({
  //   firstName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')
  //   ]),
  //   lastName: new FormControl('', [Validators.required]),
  //   emailId: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
  //   ]),
  //   phoneNumber: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(10),
  //     Validators.pattern('^[0-9]+$')
  //   ]),
  //   schoolName: new FormControl('', Validators.required),
  //   board: new FormControl('', Validators.required),
  //   city: new FormControl(''),
  //   state: new FormControl(''),
  //   designation: new FormControl(''),
  //   comments: new FormControl(''),
  //   selectedDate: new FormControl('', Validators.required),
  //   timeSlot: new FormControl('', Validators.required),
  // });

  constructor(private leadGenerationService:LeadGenerationService){}

  onSubmit() {
    if (this.registrationForm.valid) {
      const selectedDate = this.registrationForm.value.selected_date.toLocaleString()
      const dateOnly = selectedDate.split(',')[0];
      const payload = {
        first_name: this.registrationForm.value.first_name,
        last_name: this.registrationForm.value.last_name,
        email: this.registrationForm.value.email_id,
        phone: this.registrationForm.value.phone_number,
        school_name: this.registrationForm.value.school_name,
        board: this.registrationForm.value.board,
        city: this.registrationForm.value.city,
        state: this.registrationForm.value.state,
        designation: this.registrationForm.value.designation,
        comments: this.registrationForm.value.comments,
        selected_date: dateOnly,
        time_slot: this.registrationForm.value.time_slot,
      }
      
      this.leadGenerationService.sendFormData(payload).subscribe((response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    } else {
      console.log('Form is invalid');
    }
  }

  notifyParent() {
    const formValues = this.registrationForm.value;
    const isAnyFieldFilled = Object.values(formValues).some(value => value !== null && value !== undefined && value.trim() !== '');

    if (isAnyFieldFilled) {
      console.log('Form Values:', formValues);
      this.scheduleCallStatusChanged.emit(true);
    } else {
      this.scheduleCallStatusChanged.emit(false);
    }
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active-schedule')) {
      const formValues = this.registrationForm.value;
      const isAnyFieldFilled = Object.values(formValues).some(value => value !== null && value !== undefined && value.trim() !== '');

      if (isAnyFieldFilled) {
        console.log('Form Values:', formValues);
        this.scheduleCallStatusChanged.emit(true);
      } else {
        this.scheduleCallStatusChanged.emit(false);
      }
    } 
  }
}