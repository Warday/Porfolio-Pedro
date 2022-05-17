import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { About } from 'src/app/data/about';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutList: About[] = [];
  isUserLogged: Boolean = false;
  aboutForm: FormGroup;
  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder  
    ) { 
      this.aboutForm = this.formBuilder.group({
        id: [''],
        about: ['', [Validators.required]],
      });
    }

    ngOnInit(): void {
      this.isUserLogged = this.authService.isUserLogged();
      this.reloadData();
    }
    private reloadData() {
      this.porfolioService.getDattaAbout().subscribe(
        (data) => {
          this.aboutList = data;
        }
      );
    }
  
    onSubmit() {
      let about: About = this.aboutForm.value;
      this.porfolioService.modifyAbout(about).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  
    private loadForm(about: About) {
      this.aboutForm.setValue({
        id: about.id,
        about: about.about,

      })
    }
  
    onEditAbout(index: number) {
      let about: About = this.aboutList[index];
      this.loadForm(about);
    }

}
