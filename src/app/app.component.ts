import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig, TreeDragDropService, TreeNode } from 'primeng/api';
import { XlsxService } from './services/xlsx.service';

type PlayerModel = {
    label: string,
    data: string,
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
    average: number
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TreeDragDropService,MessageService],
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  pace: number = 0;
  shooting: number = 0;
  passing: number = 0;
  dribbling: number = 0;
  defending: number = 0;
  physical: number = 0;
  average: number = 0;

  players: {
    label: string,
    data: string,
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
    average: number
  }[] = [];

  newPlayerForm: FormGroup;

  uploadedPlayers: any[] = [];

  playerPool = []
  reservePool = []
  firstTeam: any[] = [];
  secondTeam: any[] = [];
  reserveTeam: any[] = [];

  constructor(private primengConfig: PrimeNGConfig, private formBuilder: FormBuilder, private xlsxService: XlsxService, private messageService: MessageService) {
    this.reservePool = [
      {
        label: 'Lista de jugadores',
        data: 'Todos los jugadores',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
        //   {
        //   label: '1',
        //   data: '1',
        //   pace: 1,
        //   shooting: 1,
        //   passing: 1,
        //   dribbling: 1,
        //   defending: 1,
        //   physical: 1,
        //   average: 1,
        // },{
        //   label: '2',
        //   data: '2',
        //   pace: 2,
        //   shooting: 2,
        //   passing: 2,
        //   dribbling: 2,
        //   defending: 2,
        //   physical: 2,
        //   average: 2,
        // },{
        //   label: '3',
        //   data: '3',
        //   pace: 3,
        //   shooting: 3,
        //   passing: 3,
        //   dribbling: 3,
        //   defending: 3,
        //   physical: 3,
        //   average: 3,
        // },{
        //   label: '4',
        //   data: '4',
        //   pace: 4,
        //   shooting: 4,
        //   passing: 4,
        //   dribbling: 4,
        //   defending: 4,
        //   physical: 4,
        //   average: 4,
        // },{
        //   label: '5',
        //   data: '5',
        //   pace: 5,
        //   shooting: 5,
        //   passing: 5,
        //   dribbling: 5,
        //   defending: 5,
        //   physical: 5,
        //   average: 5,
        // },{
        //   label: '6',
        //   data: '6',
        //   pace: 6,
        //   shooting: 6,
        //   passing: 6,
        //   dribbling: 6,
        //   defending: 6,
        //   physical: 6,
        //   average: 6,
        // },{
        //   label: '7',
        //   data: '7',
        //   pace: 7,
        //   shooting: 7,
        //   passing: 7,
        //   dribbling: 7,
        //   defending: 7,
        //   physical: 7,
        //   average: 7,
        // },{
        //   label: '8',
        //   data: '8',
        //   pace: 8,
        //   shooting: 8,
        //   passing: 8,
        //   dribbling: 8,
        //   defending: 8,
        //   physical: 8,
        //   average: 8,
        // },{
        //   label: '9',
        //   data: '9',
        //   pace: 9,
        //   shooting: 9,
        //   passing: 9,
        //   dribbling: 9,
        //   defending: 9,
        //   physical: 9,
        //   average: 9,
        // },{
        //   label: '10',
        //   data: '10',
        //   pace: 10,
        //   shooting: 10,
        //   passing: 10,
        //   dribbling: 10,
        //   defending: 10,
        //   physical: 10,
        //   average: 10,
        // }
      ]
    }];

    this.createForm();
  }

  get paceForm(){
    return this.newPlayerForm.get('pace') as FormControl;
  }
  get shootingForm(){
    return this.newPlayerForm.get('shooting') as FormControl;
  }
  get passingForm(){
    return this.newPlayerForm.get('passing') as FormControl;
  }
  get dribblingForm(){
    return this.newPlayerForm.get('dribbling') as FormControl;
  }
  get defendingForm(){
    return this.newPlayerForm.get('defending') as FormControl;
  }
  get physicalForm(){
    return this.newPlayerForm.get('physical') as FormControl;
  }
  get averageForm(){
    return this.newPlayerForm.get('average') as FormControl;
  }

  get firstTeamAverage(){
    let average = 0;
    this.firstTeam.forEach(player => {
      average += player.average;
    });

    average = average / this.firstTeam.length;
    
    return average.toFixed(0);
  }

  get secondTeamAverage(){
    let average = 0;
    this.secondTeam.forEach(player => {
      average += player.average;
    });

    average = average / this.secondTeam.length;

    return average.toFixed(0);
  }


  ngOnInit() {
      this.primengConfig.ripple = true;
  }

  onSubmit(){
    console.log(this.newPlayerForm.value)
    this.addPlayer({
      label: this.newPlayerForm.value.label,
      data: this.newPlayerForm.value.data,
      pace: this.newPlayerForm.value.pace,
      shooting: this.newPlayerForm.value.shooting,
      passing: this.newPlayerForm.value.passing,
      dribbling: this.newPlayerForm.value.dribbling,
      defending: this.newPlayerForm.value.defending,
      physical: this.newPlayerForm.value.physical,
      average: this.newPlayerForm.value.average,
    });
  }

  addPlayer(newPlayer){
    this.reservePool[0].children.push(newPlayer);
  }
  
  addFile(event) {
    console.log(event)
    this.xlsxService.importExcel(event).then((data) => {
      data.forEach((player: any) => {
        const wrapPlayer = {
          label: player.Jugador,
          data: player.Descripcion,
          pace: player.Ritmo,
          shooting: player.Tiro,
          passing: player.Pase,
          dribbling: player.Regate,
          defending: player.Defensa,
          physical: player.Fisico,
          average: Math.round((player.Ritmo + player.Tiro + player.Pase + player.Regate + player.Defensa + player.Fisico) / 6),
        };
        console.log(wrapPlayer)
        this.reservePool[0].children.push(wrapPlayer);
      });
    });
  }
  
  //algorithm that can balance two teams with the averages of each player
  balanceTeams(){
    console.log(this.playerPool)
    let firstTeam = [];
    let secondTeam = [];
    let players: any[] = this.playerPool;

     players.sort((a, b) => {
      return a.average - b.average;
    });

    players.forEach(player => {
     player.label = player.label + ` (${player.average})`;
    });

    for (let index = 0; index <= 5; index++) {
      if(players.length > 2){
        if (index % 2 == 0) {
          firstTeam.push(players[0]);
          firstTeam.push(players[players.length - 1]);
          players.shift();
          players.pop();

        } else {
          secondTeam.push(players[0]);
          secondTeam.push(players[players.length - 1]);

          players.shift();
          players.pop();
        }      
      } else {
        if (index % 2 == 0) {
          firstTeam.push(players[0]);
          players.shift();
        } else {
          secondTeam.push(players[0]);
          players.shift();
        }
      }
    }

    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;

   
  }

  calculateAverageTeam(team){
    let average = 0;
    for(let i = 0; i < team.length; i++){
      average += team[i].average;
    }
    return average;
  }

  calculateAverageDifference(average){
    let difference = 0;
    difference = average - this.average;
    return difference;
  }

  createForm(){
    this.newPlayerForm = this.formBuilder.group({
      label: ['', Validators.required],
      data: ['', Validators.required],
      pace: [''],
      shooting: [''],
      passing: [''],
      dribbling: [''],
      defending: [''],
      physical: [''],
      average: ['']
    });

    this.paceForm.valueChanges.subscribe((value) => {
      this.pace = value;
      this.averageForm.setValue(this.calculateAverage());
    })
    this.shootingForm.valueChanges.subscribe((value) => {
      this.shooting = value;
      this.averageForm.setValue(this.calculateAverage());
    })
    this.passingForm.valueChanges.subscribe((value) => {
      this.passing = value;
      this.averageForm.setValue(this.calculateAverage());
    })
    this.dribblingForm.valueChanges.subscribe((value) => {
      this.dribbling = value;
      this.averageForm.setValue(this.calculateAverage());
    })
    this.defendingForm.valueChanges.subscribe((value) => {
      this.defending = value;
      this.averageForm.setValue(this.calculateAverage());
    })
    this.physicalForm.valueChanges.subscribe((value) => {
      this.physical = value;
      this.averageForm.setValue(this.calculateAverage());
    })

    
  }

  calculateAverage(){
    return Math.round(((this.pace + this.shooting + this.passing + this.dribbling + this.defending + this.physical) / 6));
  }

  calculatePlayerAverage(player){
    return Math.round(((player.pace + player.shooting + player.passing + player.dribbling + player.defending + player.physical) / 6));
  }
}

