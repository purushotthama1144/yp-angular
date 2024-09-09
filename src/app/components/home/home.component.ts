import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { FoundersComponent } from '../founders/founders.component';
import { TestimonialsComponent } from "../testimonials/testimonials.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TabComponent, FoundersComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

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

        // Check if the section is in the viewport
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          // Set the first visible section as active
          this.activeSection = sectionId;
          break; // Exit loop once the first visible section is found
        }
      }
    }
  }

  // Scroll to a particular section with an offset for the fixed menu
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 130; // Adjust based on your fixed menu height
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth',
      });
    }
  }
}
