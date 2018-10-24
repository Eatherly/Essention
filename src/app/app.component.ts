import { Component } from '@angular/core';
     
class sentenseArr{
    sentence: string[];
     
    constructor(sentence: string[]) {
  
        this.sentence = sentence;
    }
}

 
@Component({
    selector: 'parse-app',
    template: `
<div class="container">
        <div class="page-header">
            <h1> Parser </h1>
        </div>
    <div class="row form-group">
        <div class="col-md-9">
            <input class="form-control" [(ngModel)]="text" placeholder = "Please, enter the text" />
        </div>
        <div class="col-md-2">
            <button class="btn btn-warning" (click)="parseString(text)">Parse</button>
        </div>
    </div>

    <div class="row" [ngClass]="{invisible: visibility}">
        <div class="col-md-5">
           <h2>XML</h2>
            <span>&lt;?xml version="1.0" encoding="UTF-8" standalone="yes"?&gt;</span>
                <ul class="text">   
                    <li>&lt;text&gt;
                         <ul *ngFor="let row of sentenceStorage; let i = index">
                            <li>&lt;sentence&gt;
                                 <ul *ngFor="let col of row.sentence; let j = index">   
                                     <li>&lt;word&gt;{{col}}&lt;/word&gt;</li>
                                </ul>
                             &lt;/sentence&gt;</li>
                         </ul>
                    &lt;/text&gt;</li>
                </ul>
          </div>
          <div class="col-md-6">
              <h2>CSV</h2>
                <span *ngFor="let col of maxSentence; let j = index">
                    <span>, Word {{j+1}}</span>
                </span><br>
                <p *ngFor="let row of sentenceStorage; let i = index">
                            <span>Sentence{{i+1}}
                                 <span *ngFor="let col of row.sentence; let j = index">   
                                     <span>, {{col}}</span>
                                </span><br>
                            </span>
                         </p>
          </div>
    </div>
</div> `,
    styles: [` 
            h1, h2{color:navy;}
            p{font-size:13px; font-family:Verdana;}
            li{list-style-type: none;}
            .invisible{display:none;}
            .container: width: 1000px;
        
    `]
})
export class AppComponent { 
    sentenceStorage: sentenseArr[] = 
    [
        { sentence: [] }
    ];
    visibility: boolean = true;
    maxSentence: string[];
    parseString(text: string): void {
         
    if(text==null || text.trim()==""){
        this.visibility=true
            return;
        }
    else{
        this.visibility=false
        let stringToGiperArr:any =text.replace(/[,\/#$%\^&\*;:{}=\-_`~()''""]/g,"").replace(/\s+/g,' ').split(/[.!?]/g).filter(item => item !== "")
        stringToGiperArr=stringToGiperArr.map(function(num:string){
            num=num.trim();
            return num.split(" ").sort(function(a:string, b:string) {
                if (a.toLowerCase() < b.toLowerCase()) return -1;
                if (a.toLowerCase() > b.toLowerCase()) return 1;
                return 0;
            });  
        })
        
        let longestSentece:string[]=stringToGiperArr[0];
        stringToGiperArr.forEach(function(item:string[],i:number){
            if (item.length>longestSentece.length){
               longestSentece=item
            }
        })
        this.sentenceStorage=[]
        for(let i:number=0; i<=stringToGiperArr.length-1; i++){
                   this.sentenceStorage.push(new sentenseArr(stringToGiperArr[i]));
        }
        this.maxSentence=longestSentece;

    }
        
    }
}


