import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-entrepreneurial-excellence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrepreneurial-excellence.component.html',
  styleUrl: './entrepreneurial-excellence.component.scss'
})
export class EntrepreneurialExcellenceComponent {
steps = [
    {
      title: 'Step 1: All-India Quiz',
      description: 'A national-level quiz featuring challenging questions and scenarios designed to assess students in:',
      points: [
        'Understanding of entrepreneurial concepts and skills',
        'Awareness of business strategies and market dynamics'
      ],
      image: './assets/images/section_quiz.png',
      altText: 'All India Quiz',
      borderClass: 'purple-border border-top-left-radius-100',
      layoutClass: 'two-col-block-left-text-right-image'
    },
    {
      title: 'Step 2: Mentorship',
      description: 'A round of online sessions by business school faculty and entrepreneurs to guide students in:',
      points: [
        'Identifying market opportunities',
        'Developing business strategies',
        'Honing their pitching skills',
        'Assessing their business plans'
      ],
      image: './assets/images/section_mentorship.png',
      altText: 'Mentorship',
      borderClass: 'orange-border border-top-right-radius-100',
      layoutClass: 'two-col-block-left-image-right-text'
    },
    {
      title: 'Step 3: Launchpad',
      description: 'A national-level event offering a platform to students from diverse backgrounds to:',
      points: [
        'Showcase business plans to entrepreneurs or investors',
        'Acquire valuable insights and constructive feedback'
      ],
      image: './assets/images/section_launchpad.png',
      altText: 'Launchpad',
      borderClass: 'pink-border border-top-left-radius-100',
      layoutClass: 'two-col-block-left-text-right-image'
    }
  ]
}
