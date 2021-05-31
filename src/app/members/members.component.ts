import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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

  @ViewChild('popover', {static: false}) popover: ElementRef; 

  constructor(public appService: AppService, private router: Router) {}
  
  ngOnInit() {
    this.getMembers()
  }

  getMembers() {
    this.appService.getMembers().subscribe(members => { 
      this.members = members
      console.log(this.members)
    });
  }
  
  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }

  editMemberByID(memberData: any) {
    console.log('id: ', memberData )
    // this.goToAddMemberForm()
    this.router.navigate(['/member-details'],
      { 
        queryParams: {id: memberData.id, edit: 'true'},
        state: {data: memberData}
      });
    // this.editItem = id
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(res => { 
      console.log(res)
      this.members = this.members.filter(member => member.id != res.id )
      console.log(this.members)
    });
  }
}
