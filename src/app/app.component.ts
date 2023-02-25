import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent  implements OnInit{

  constructor(private fireStore:AngularFirestore){}

  ngOnInit(): void {
    this.fireStore.collection('Rooms').get().subscribe((r)=>{
      r.docs.forEach((d)=>{console.log(d.data())})
    })

  }
  
  
  title = "Checkers";
}

