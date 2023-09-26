import { Component, Input, OnInit } from '@angular/core';
import { TemplateserviceService } from 'src/app/templateservice.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public NumTemplate:number
  constructor(public numtemplate:TemplateserviceService) { }

  ngOnInit(): void {
    this.NumTemplate=3;

  }
  getNumtemplate(){
    this.NumTemplate=this.numtemplate.NumTemplate;
  }
}
