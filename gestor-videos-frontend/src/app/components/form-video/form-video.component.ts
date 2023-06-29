import { Component } from '@angular/core';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css']
})
export class FormVideoComponent {
  video: {
    file: File | null;
    title: string;
    description: string;
    tags: string;
  } = {
    file: null,
    title: '',
    description: '',
    tags: ''
  };
}
