import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}



@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted: boolean = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  templateProps = {
    h3: 'Add Member to Racing Team',
    button: 'Add Member'
  }
  memberDetails: Member = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    team: '',
    status: '',
  }
  optionValue: any = {
    teamName: '',
  }

  constructor(private fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private route: ActivatedRoute
              ) {}

  ngOnInit() {
    if(history.state.data) {
      // if user came from Member Component to edit an item
      this.setEditProps();
    }     
    this.getTeams();
    this.initForm();
  }

  setEditProps() {
    this.memberDetails = history.state.data
    this.templateProps = {
      h3: 'Edit Member',
      button: 'Save Changes'
    }
  }

  initForm() {
    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnChanges() {}

  getTeams() {
    this.appService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
        // if editing populate selected Team option 
        if(this.memberDetails['id'])
          this.optionValue = this.teams.find(team => team.teamName === this.memberDetails.team);
      });
  }

  saveMember(data: any) {
    this.appService.addMember(data)
      .subscribe(_ => this.goToMemberCompnt());
  }

  editMember(newData: any) {
    this.appService.editMember(newData, this.memberDetails['id'])
      .subscribe(_ => this.goToMemberCompnt());
  }

  onSubmit() {
    this.memberModel = this.memberForm.value;

    if(this.memberDetails['id']) 
      this.editMember(this.memberModel);
    else 
      this.saveMember(this.memberModel);
  }

  goToMemberCompnt() {
    this.router.navigate(['/members']);
  }
}
