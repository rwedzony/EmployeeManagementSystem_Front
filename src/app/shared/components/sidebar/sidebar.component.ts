import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  username:string;
  ngOnInit(): void {
  }


}
