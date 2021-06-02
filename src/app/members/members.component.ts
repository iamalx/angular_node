import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  toastMssg: string = '';

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
      this.showToast('Member deleted successfully!');
    }, err => this.showToast('Could not delete member'));
  }
  
  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }

  showToast(mssg: string) {
    this.toastMssg = mssg;
    setTimeout(_ => this.toastMssg = '', 2500);
  }
}
