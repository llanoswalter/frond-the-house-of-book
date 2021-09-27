import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['../../app.component.css','./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  public contacto : any;
  constructor() {
    this.contacto = new COntato("","","");
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    Swal.fire(
      'Gracias!',
      `nosotros te contactamos a ${this.contacto.email}`,
      'success'
    )
    form.reset();
  }
}
export class COntato{
  constructor(
    public name: string,
    public email: string,
    public message: string
  ){

  }
}