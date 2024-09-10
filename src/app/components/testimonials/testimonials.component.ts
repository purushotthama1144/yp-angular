import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CarouselModule , CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit {
  isDragging: boolean = false;
  isBrowser: boolean;
  
  founders = [
    {
      name: 'Dr. Sanjay Roy',
      subtitle: 'Principal, Greenlawns School',
      image: './assets/images/testimonials-1.png',
      description: '“I strongly support the Entrepreneurship Programme because it expands students’ vision, it expands their horizon of thinking as well as helps them come up with solutions for the future. If we are looking at future India becoming a world guru, I think this holds the key.”'
    },
    {
      name: 'Bindu Subramaniam',
      subtitle: 'CEO & Founder, SaPa in Schools',
      image: './assets/images/testimonials_bindu.png',
      description: '“It\'s very inspiring to see how passionate people are about entrepreneurship and its very inspiring to see the ideas that these high schoolers have come up with and that they put so much effort and do. And I\'m truly honored to be a part of an event like this.”'
    }
  ];

  foundersListing = {
    loop:true,
    margin:10,
    nav:true,
    items:1,
    autoplay:false,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
    navText: ["<span class='left-arrow'>","<span class='right-arrow'>"],
    dots: false,
    responsive:{
        0:{
            nav:false,
            dots:true,
        },
        810:{
            nav:true,
            dots:false,
        },
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private el: ElementRef, private renderer: Renderer2) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.adjustColumnHeights()
  }

  adjustColumnHeights() {
    if (this.isBrowser) { 
      const windowWidth = window.innerWidth;
      const testimonialColumns = this.el.nativeElement.querySelectorAll('.testimonials .two-col-block .col');
  
      if (windowWidth >= 810) {
        let maxHeight = 0;
  
        testimonialColumns.forEach((col: HTMLElement) => {
          const colHeight = col.offsetHeight;
          if (colHeight > maxHeight) {
            maxHeight = colHeight;
          }
        });
  
        testimonialColumns.forEach((col: HTMLElement) => {
          this.renderer.setStyle(col, 'height', `${maxHeight}px`);
        });
  
      } else {
        testimonialColumns.forEach((col: HTMLElement) => {
          this.renderer.setStyle(col, 'height', 'auto');
        });
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustColumnHeights();
  }

  // Call this method once the view is initialized
  ngAfterViewInit() {
    this.adjustColumnHeights();
  }
}
