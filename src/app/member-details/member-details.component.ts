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
  teams: [string] = [''];
  templateProps = {
    h3: 'Add Member to Racing Team',
    button: 'Add Member'
  }
  memberDetails: {};
  faa = 'no';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router,  private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap.get('id'));
    if(this.route.snapshot.queryParamMap.get('id')) {
      this.setEditProps();
      this.memberDetails = history.state.data
    }
    this.getTeams();

    this.initForm();
  }

  setEditProps() {
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
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  // TODO: Add member to members
  onSubmit() {
    // console.log(form.value);
    this.memberModel = this.memberForm.value;
    console.log(this.memberModel);

    this.appService.addMember(this.memberModel)
      .subscribe(res => {
        this.router.navigate(['/members']);
        console.log(res)
      });
  }
}
