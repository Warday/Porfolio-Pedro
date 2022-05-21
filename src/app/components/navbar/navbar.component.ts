import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navbar } from 'src/app/data/navbar';
import { AuthService } from 'src/app/service/auth.service';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarList: Navbar[] = [];
  isUserLogged: Boolean = false;


  constructor(
    private porfolioService: PortfolioService,
    private authService: AuthService,
  ) {
     }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }
  private reloadData() {
    this.porfolioService.getDattaNavbar().subscribe(
      (data) => {
        this.navbarList = data;
      }
    );
  }



  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
