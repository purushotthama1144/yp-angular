import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})

export class TabComponent {
  activeTabIndex: number = 0;

  tabs = [
    {
      title: 'Coursebook',
      description: `A comprehensive syllabus covering Beginner, Intermediate and Advanced levels
                    covered over three years, featuring the <b>fundamentals of entrepreneurship</b>
                    including the SMART model, SWOT analysis, business plan concepts and more`,
      downloadLink: 'https://www.youngpioneers.in/Entrepreneurship_Ch01.pdf',
      imageSrc: './assets/images/ico_course_coursebook.png',
      contentImageSrc: './assets/images/ico_course_coursebook_panelbg.png',
      borderColor: 'orange-border'
    },
    {
      title: 'Masterclasses',
      description: `A series of monthly sessions by <b>startup founders</b> and <b>industry experts</b> 
                    for students, providing them insights, strategies, real-life anecdotes and an in-depth look 
                    into the practical applications of entrepreneurship concepts.`,
      imageSrc: './assets/images/ico_course_masterclass.png',
      contentImageSrc: './assets/images/ico_course_masterclass_panelbg.png',
      borderColor: 'pink-border'
    },
    {
      title: 'All-India Quiz',
      description: `A <b>national-level event</b> that brings together young minds from diverse backgrounds 
                    to assess their understanding of entrepreneurial concepts and skills, encouraging creative and critical thinking.`,
      imageSrc: './assets/images/ico_course_allindiaquiz.png',
      contentImageSrc: './assets/images/ico_course_quiz_panelbg.png',
      borderColor: 'purple-border'
    },
    {
      title: 'Mentorship',
      description: `A series of sessions led by business school faculty members and entrepreneurs, guiding students 
                    on <b>crafting compelling business plans</b> and <b>delivering impactful pitches</b> with clarity and precision.`,
      imageSrc: './assets/images/ico_course_mentorship.png',
      contentImageSrc: './assets/images/ico_course_mentorship_panelbg.png',
      borderColor: 'orange-border'
    },
    {
      title: 'Launchpad',
      description: `A platform for students to showcase their ideas by presenting their business plans with a focus on value propositions, 
                    market opportunities, and growth strategies, to a panel of entrepreneurs and investors.`,
      imageSrc: './assets/images/ico_course_launchpad.png',
      contentImageSrc: './assets/images/ico_course_launchpad_panelbg.png',
      borderColor: 'pink-border'
    },
    {
      title: 'Teacher Training',
      description: `A training session with reading and viewing material, and webinars/workshops, designed to assist teachers 
                    in conducting the classroom portion of the programme, equipping them with the knowledge and tools needed 
                    to integrate entrepreneurship education into the curriculum.`,
      imageSrc: './assets/images/ico_course_teachertraining.png',
      contentImageSrc: './assets/images/ico_course_teachertraining_panelbg.png',
      borderColor: 'purple-border'
    }
  ];

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  isActive(index: number): boolean {
    return this.activeTabIndex === index;
  }
}