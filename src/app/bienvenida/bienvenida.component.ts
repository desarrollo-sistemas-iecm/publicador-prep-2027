import { Component, OnInit, inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  private spinnerService = inject(SpinnerService);
  private router = inject(Router);
  
  ngOnInit(): void {    
    this.showLowader();
  }



  showLowader(){
    this.spinnerService.loadingOn();
    
    setTimeout(() => {
      
      this.spinnerService.loadingOff();
    }, 1000);
  }

}
