import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.getTeams()

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
