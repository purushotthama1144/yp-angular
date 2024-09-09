import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {

  isMenuOpen = false;
  @Output() navigateToSection = new EventEmitter<string>();

  isBrowser: boolean;
  activeMenuItem: string = '';
  sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.onScroll = this.onScroll.bind(this);
  }

  ngOnInit() {    
    if (this.isBrowser) {
      this.onScroll();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.onScroll();
    }
  }

  scrollToSection(sectionId: string) {
    if (this.isBrowser) {
      this.isMenuOpen = false;
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      this.activeMenuItem = sectionId;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.isBrowser) { 
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }

    for (const sectionId of this.sections) {
      const section = document.getElementById(sectionId);
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          this.activeMenuItem = sectionId;
          break;
        }
      }
    }
  }

}