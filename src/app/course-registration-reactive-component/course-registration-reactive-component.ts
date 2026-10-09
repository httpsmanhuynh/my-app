import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Huynh Tuyet Man', [
        Validators.required,
        Validators.minLength(3),
        this.customNameValidator,
      ]),
      email: new FormControl('manhtk24406h@st.uel.edu.vn', [Validators.required, Validators.email]),

      // Gắn validator kiểm tra độ mạnh password
      password: new FormControl('', [Validators.required, this.passwordStrengthValidator]),

      confirmPass: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  // Hàm kiểm tra độ mạnh của mật khẩu
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    const hasMinLength = value.length >= 8; // Tối thiểu 8 ký tự
    const hasUpperCase = /[A-Z]/.test(value); // Có chữ in hoa
    const hasNumber = /\d/.test(value); // Có số
    const hasSpecialChar = /[@$!%*?&#^~_]/.test(value); // Có ký tự đặc biệt

    const passwordValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

    return !passwordValid
      ? {
          passwordStrength: {
            hasMinLength,
            hasUpperCase,
            hasNumber,
            hasSpecialChar,
          },
        }
      : null;
  }

  customNameValidator(control: AbstractControl): { [key: string]: any } | null {
    const matchName = /[@#$%^&]/g.test(control.value);
    return matchName ? { nameNotMatch: { value: control.value } } : null;
  }

  setDefaultValues() {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn',
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');

    if (password && confirmPass && password.value !== confirmPass.value) {
      return { mismatch: true };
    }
    return null;
  }
}
