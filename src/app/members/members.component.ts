import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: [] = [];
  editItem: number;

  @ViewChild('popover', {static: false}) popover: ElementRef; 

  constructor(public appService: AppService, private router: Router) {
  
  }
  
  ngOnInit() {
    this.appService.getMembers().subscribe(members => { 
      this.members = members
      console.log(this.members)
    });
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }

  editMemberByID(id: number) {
    console.log('id: ', id )
    this.goToAddMemberForm()
    // this.editItem = id;
  }

  deleteMemberById(id: number) {
    console.log('id: ', id )
    this.appService.deleteMember(id).subscribe(res => { 
      console.log('deleted: ', res)
    });
  }
}
