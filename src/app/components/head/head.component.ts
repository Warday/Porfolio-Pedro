import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Head } from 'src/app/data/head';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  headList: Head[] = [];
  isUserLogged: Boolean = false;
  headForm: FormGroup;

  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder  ) {
      this.headForm = this.formBuilder.group({
        id: [''],
        bannerimg: ['', [Validators.required]],
        name: ['', [Validators.required]],
        myimg:['', [Validators.required]],
        work: ['', [Validators.required]],
        home: ['', [Validators.required]],
        work1: ['', [Validators.required]],
        imgwork1: ['', [Validators.required]],
        urlwork1: ['', [Validators.required]],
        work2: ['', [Validators.required]],
        imgwork2: ['', [Validators.required]],
        urlwork2: ['', [Validators.required]],
      });
   }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }
  private reloadData() {
    this.porfolioService.getDattaHead().subscribe(
      (data) => {
        this.headList = data;
      }
    );
  }

  onSubmit() {
    let head: Head = this.headForm.value;
    this.porfolioService.modifyHead(head).subscribe(
      () => {
        this.reloadData();
      }
    )
  }

  private loadForm(head: Head) {
    this.headForm.setValue({
      id: head.id,
      bannerimg: head.bannerimg,
      name: head.name,
      myimg: head.myimg,
      work: head.work,
      home: head.home,
      work1: head.work1,
      imgwork1: head.imgwork1,
      urlwork1:head.urlwork1,
      work2: head.work2,
      imgwork2: head.imgwork2,
      urlwork2:head.urlwork2
    })
  }

  onEditHead(index: number) {
    let head: Head = this.headList[index];
    this.loadForm(head);
  }

}
