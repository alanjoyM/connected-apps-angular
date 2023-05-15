import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

    logout(){
      this.router.navigateByUrl('/login')
    }
}
