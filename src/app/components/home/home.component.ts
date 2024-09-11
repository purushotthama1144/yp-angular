import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { FoundersComponent } from '../founders/founders.component';
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { FooterComponent } from '../../static-components/footer/footer.component';
import { EntrepreneurialExcellenceComponent } from "../entrepreneurial-excellence/entrepreneurial-excellence.component";
import { LeadGenerationFormComponent } from "../lead-generation-form/lead-generation-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TabComponent, FoundersComponent, TestimonialsComponent, FooterComponent, EntrepreneurialExcellenceComponent, LeadGenerationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  schedule_call: boolean = false;
  isBrowser: boolean;
  activeSection: string = '';
  sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
   
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    for (const sectionId of this.sections) {
      const section = document.getElementById(sectionId);
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          this.activeSection = sectionId;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 120; // Adjust based on your fixed menu height
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth',
      });
    }
  }

  receiveScheduleCallStatus(status: boolean) {
    console.log("status",status)
    this.schedule_call = status;
  }

  toggleScheduleCall() {
    this.schedule_call = !this.schedule_call;
  }

}
