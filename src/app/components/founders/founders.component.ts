import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-founders',
  standalone: true,
  imports: [ CommonModule , CarouselModule ],
  templateUrl: './founders.component.html',
  styleUrl: './founders.component.scss'
})

export class FoundersComponent {
  isDragging: boolean = false;
  activePopup: string | null = null;
  
  founders = [
    {
      name: 'Vedang Patel',
      designation: 'Co-founder, The Souled Store',
      imageSrc: '/assets/images/vedang-small.png',
      popupId: 'popup-vedang',
      largeImageSrc: '/assets/images/vedang-large.png',
      mobileImageSrc: '/assets/images/vedang-mobile.png',
      description: `Vedang completed his engineering in 2010 from Sardar Patel College of Engineering. After graduating, he worked as a financial analyst for two years. He had cleared CAT and got admission calls from three premier institutes in the country. <br><br>Right after the admission, he realised that the world of finance had stopped giving him joy and the intent to break monotony brought him to entrepreneurship.`
    },
    {
      name: 'Swathy Rohit',
      designation: 'CEO & Founder, Health Basix',
      imageSrc: '/assets/images/swathy-small.png',
      popupId: 'popup-swathy',
      largeImageSrc: '/assets/images/swathy-large.png',
      mobileImageSrc: '/assets/images/swathy-mobile.png',
      description: `Swathy Rohit is the Founder CEO of Health Basix, which is devoted to the well-being of children through holistic physical and mental health care. With a Bachelor of Engineering (BE) in Mechanical Engineering from University of Virginia under her belt, Ms. Swathy is also skilled in operations, business planning, market research, manufacturing, and management.`
    },
    {
      name: 'Bindu Subramaniam',
      designation: 'CEO & Co-founder, SaPa in Schools',
      imageSrc: '/assets/images/bindu-small.png',
      popupId: 'popup-bindu',
      largeImageSrc: '/assets/images/bindu-large.png',
      mobileImageSrc: '/assets/images/bindu-mobile.png',
      description: `Bindu Subramaniam is the CEO and Co-founder of SaPa in Schools, which works to create an ecosystem for music education and integrate it into mainstream academic curriculum. She is a graduate from Stanford University School of Business and holds a PhD in Music Education.`
    }
  ];

  foundersListing: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    nav: false,
    autoplay: false,
    autoplaySpeed: 500,
    margin:20,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2
      },
      740: {
        items: 3
      },
    },
  }
  
  showPopup(popupId: string) {
    console.log(popupId)
    this.activePopup = popupId;
  }

  closePopup() {
    this.activePopup = null;
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('popup')) {
      this.closePopup();
    }
  }
}
