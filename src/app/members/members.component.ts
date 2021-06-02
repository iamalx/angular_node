import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  editItem: number;

  constructor(public appService: AppService, private router: Router) {}
  
  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.appService.getMembers().subscribe(members => this.members = members);
  }

  editMemberByID(memberData: any) {
    this.router.navigate(['/member-details'],
      { 
        queryParams: {id: memberData.id, edit: 'true'},
        state: {data: memberData}
      }
    );
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(res => { 
      this.members = this.members.filter(member => member.id != res.id );
    });
  }
  
  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }
}
