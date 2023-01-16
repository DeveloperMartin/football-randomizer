import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { MessageService, PrimeNGConfig, TreeDragDropService, TreeNode } from 'primeng/api';

type FormModel = {
  label: number,
      data: number,
      pace: {
        paceAverage: number,
        acceleration: number,
        sprintSpeed: number,
      },
      shooting: {
        shootingAverage: number,
        positioning: number,
        finishing: number,
        shotPower: number,
        longShots: number,
        volleys: number,
        penalties: number,
        headingAccuracy: number,
      },
      passing: {
        vision: number,
        crossing: number,
        freeKick: number,
        shortPassing: number,
        longPassing: number,
        curve: number,
      },
      dribbling: {
        agility: number,
        balance: number,
        reactions: number,
        ballControl: number,
        dribbling: number,
        composure: number,
      },
      defending: {
        interceptions: number,
        heading: number,
        marking: number,
        standingTackle: number,
        slidingTackle: number,
      },
      physical: {
        jumping: number,
        stamina: number,
        strength: number,
        aggression: number,
      },
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TreeDragDropService,MessageService],
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  pace: {paceAverage: number, acceleration: number, sprintSpeed: number} = {paceAverage: 100, acceleration: 100, sprintSpeed: 100};  
  shooting: {shootingAverage: number, positioning: number, finishing: number, shotPower: number, longShots: number, volleys: number, penalties: number, headingAccuracy: number} = {shootingAverage: 100, positioning: 100, finishing: 100, shotPower: 100, longShots: 100, volleys: 100, penalties: 100, headingAccuracy: 100};

  newPlayerForm: FormGroup;


  playerPool: TreeNode[] = [];
  firstTeam: TreeNode[] = [];
  secondTeam: TreeNode[] = [];
  reserveTeam: TreeNode[] = [];

  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder) {
    
    this.playerPool = [
      {
        label: 'Lista de jugadores',
        data: 'Todos los jugadores',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'Arqueros',
            data: 'Arqueros',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: [
              
            ]
          },
          {
            label: 'Defensores',
            data: 'Defensores',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: [
              {
                label: 'Defensor 1',
                data: 'Defensor 1',
                expandedIcon: 'pi pi-user',
                collapsedIcon: 'pi pi-user'
              },
            ]
          },
          {
            label: 'Centro campistas',
            data: 'Centro campistas',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: [
              {
                label: 'Centro campista 1',
                data: 'Centro campista 1',
                expandedIcon: 'pi pi-user',
                collapsedIcon: 'pi pi-user'
              }
            ],
          },
          {
            label: 'Delanteros',
            data: 'Delanteros',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: [
              {
                label: 'Delantero 1',
                data: 'Delantero 1',
                expandedIcon: 'pi pi-user',
                collapsedIcon: 'pi pi-user'
              }
            ],
          },
        ]
      },
    ];

    this.createForm();
  }

  get paceForm(){
    return this.newPlayerForm.get('pace') as FormGroup;
  }
  get paceAverageControl(){
    return this.paceForm.get('paceAverage') as FormControl;
  }
  get accelerationControl(){
    return this.paceForm.get('acceleration') as FormControl;
  }
  get sprintSpeedControl(){
    return this.paceForm.get('sprintSpeed') as FormControl;
  }

  get shootingForm(){
    return this.newPlayerForm.get('shooting') as FormGroup;
  }
  get shootingAverageControl(){
    return this.shootingForm.get('shootingAverage') as FormControl;
  }
  get positioningControl(){
    return this.shootingForm.get('positioning') as FormControl;
  }
  get finishingControl(){
    return this.shootingForm.get('finishing') as FormControl;
  }
  get shotPowerControl(){
    return this.shootingForm.get('shotPower') as FormControl;
  }
  get longShotsControl(){
    return this.shootingForm.get('longShots') as FormControl;
  }
  get volleysControl(){
    return this.shootingForm.get('volleys') as FormControl;
  }
  get penaltiesControl(){ 
    return this.shootingForm.get('penalties') as FormControl;
  }
  get headingAccuracyControl(){
    return this.shootingForm.get('headingAccuracy') as FormControl;
  }

  ngOnInit() {
      this.primengConfig.ripple = true;
      console.log(this.accelerationControl.value)
  }

  onSubmit(){

  }

  createForm(){
    this.newPlayerForm = this.formBuilder.group({
      label: [''],
      data: [''],
      pace: this.formBuilder.group({
        paceAverage: [''],
        acceleration: [100],
        sprintSpeed: [''],
      }),
      shooting: this.formBuilder.group({
        shootingAverage: [''],
        positioning: [''],
        finishing: [''],
        shotPower: [''],
        longShots: [''],
        volleys: [''],
        penalties: [''],
        headingAccuracy: [''],
      }),
      passing: this.formBuilder.group({
        vision: [''],
        crossing: [''],
        freeKick: [''],
        shortPassing: [''],
        longPassing: [''],
        curve: [''],
      }),
      dribbling: this.formBuilder.group({
        agility: [''],
        balance: [''],
        reactions: [''],
        ballControl: [''],
        dribbling: [''],
        composure: [''],
      }),
      defending: this.formBuilder.group({
        interceptions: [''],
        heading: [''],
        marking: [''],
        standingTackle: [''],
        slidingTackle: [''],
      }),
      physical: this.formBuilder.group({
        jumping: [''],
        stamina: [''],
        strength: [''],
        aggression: [''],
      }),
    });

    this.accelerationControl.valueChanges.subscribe(value => {
      const paceAverage = (value + this.sprintSpeedControl.value) / 2 ;
      this.paceAverageControl.setValue(paceAverage.toFixed(0));
    });

    this.sprintSpeedControl.valueChanges.subscribe(value => {
      const paceAverage = (value + this.accelerationControl.value) / 2 ;
      this.paceAverageControl.setValue(paceAverage);
    });

    this.positioningControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.shotPowerControl.value + this.longShotsControl.value + this.volleysControl.value + this.penaltiesControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    });

    this.finishingControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.positioningControl.value + this.shotPowerControl.value + this.longShotsControl.value + this.volleysControl.value + this.penaltiesControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })

    this.shotPowerControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.positioningControl.value + this.longShotsControl.value + this.volleysControl.value + this.penaltiesControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })

    this.longShotsControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.shotPowerControl.value + this.positioningControl.value + this.volleysControl.value + this.penaltiesControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })

    this.volleysControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.shotPowerControl.value + this.longShotsControl.value + this.positioningControl.value + this.penaltiesControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })

    this.penaltiesControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.shotPowerControl.value + this.longShotsControl.value + this.volleysControl.value + this.positioningControl.value + this.headingAccuracyControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })

    this.headingAccuracyControl.valueChanges.subscribe(value => {
      const shootingAverage = (value + this.finishingControl.value + this.shotPowerControl.value + this.longShotsControl.value + this.volleysControl.value + this.penaltiesControl.value + this.positioningControl.value) / 7 ;
      this.shootingAverageControl.setValue(shootingAverage.toFixed(0));
    })
  }
}

