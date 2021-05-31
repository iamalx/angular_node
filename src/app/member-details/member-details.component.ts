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
  submitted = false;
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

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router,  private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.route.snapshot.queryParamMap.get('id'));
  

    if(history.state.data) {
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
    this.appService.getTeams().subscribe(teams => {
      this.teams = teams
      if(this.memberDetails['id'])
        this.optionValue = this.teams.find(team => team.teamName === this.memberDetails.team);
      console.log(this.optionValue, this.teams, this.memberDetails.team)
    });
  }

  saveMember(data: any) {
    this.appService.addMember(data)
    .subscribe(res => {
      this.router.navigate(['/members']);
      console.log(res)
    });
  }

  editMember(newData: any) {
    console.log(newData, this.memberDetails['id'])
    this.appService.editMember(newData, this.memberDetails['id'])
    .subscribe(res => {
      this.router.navigate(['/members']);
      console.log(res)
    });
  }

  // TODO: Add member to members
  onSubmit() {
    // console.log(form.value);
    this.memberModel = this.memberForm.value;
    console.log(this.memberModel, this.memberForm);

    
    if(this.memberDetails['id']) 
      this.editMember(this.memberModel) 
    else 
    this.saveMember(this.memberModel)
  }

  onCancel() {
    this.router.navigate(['/members']);
  }
}
