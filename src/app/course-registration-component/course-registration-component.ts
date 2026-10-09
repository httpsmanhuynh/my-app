import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseRegistration } from '../classes/CourseRegistration';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-course-registration-component',
  standalone: false,
  styleUrl: './course-registration-component.css',
  templateUrl: './course-registration-component.html',
})
export class CourseRegistrationComponent {
  courseModel = new CourseRegistration();
  onSubmit() {
    let infor = this.courseModel.getInfor();
    alert('Thông tin đăng ký khóa học:' + this.courseModel.getInfor());
    alert(infor);
  }

  //   onSubmit(form: NgForm) {
  //     if (form.valid) {
  //       let course = form.value
  //       alert(JSON.stringify(course))
  //       alert("Tên khóa học =" + course.course)
  //     }
  //   }
}
