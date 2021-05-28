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
  popoverStyle = {
    // position: 'relative',
    // right: '90.20001220703125px',  
  }

  @ViewChild('popover', {static: false}) popover: ElementRef; 

  constructor(public appService: AppService, private router: Router) {
    // this.popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
    //   container: 'body'
    // })
    
  // }
  }
  
  ngOnInit() {
    this.appService.getMembers().subscribe(members => { 
      this.members = members
      console.log(this.members)
    });

    console.log(this.popover)
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }

  editMemberByID(id: number, e) {
    console.log('id: ', id )
    this.editItem = id;
    const {x, y} = this.popover.nativeElement.getBoundingClientRect();
    console.log(this.popover, x, y)
  }

  deleteMemberById(id: number) {
    console.log('id: ', id )
    this.appService.deleteMember(id).subscribe(res => { 
      console.log('deleted: ', res)
    });
  }
}
