import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from './static-components/header/header.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule , RouterOutlet , HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  currentUrl:string;
  hideHeader:boolean = true;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      console.log(this.currentUrl);
      if(this.currentUrl == '/admin-login') {
        this.hideHeader = false;
      }
    });

  }
}