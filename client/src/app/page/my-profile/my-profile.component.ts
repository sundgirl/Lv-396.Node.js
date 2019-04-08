import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private UserInfoService: UserService, private route: ActivatedRoute) { }

  user: User;
  users: User[];
  id: any;

  ngOnInit() {
    this.checkIdParam();
  }

  checkIdParam(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id ? this.loadFromArray(this.id) : this.loadUser(this.id);
  }


  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  loadUser(id?: any) {
    this.UserInfoService.getUser(id).subscribe(user => { this.user = user; });
  }

  loadFromArray(id) {
    this.UserInfoService.getAll().subscribe(users => { this.user = users[id]; });
  }
}
