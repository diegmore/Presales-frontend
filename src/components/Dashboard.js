import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { ProductService } from '../service/ProductService';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';

export class Dashboard extends Component {

    constructor(){
        super();
        this.state = {
          presale : {
            product_id : null,
            quantity: null,
            presales_id: null
          }
        };
        this.displayData = [];
        this.items = [
          {
            label : 'Presales Query',
            icon:'pi pi-fw pi-plus',
            command : () => {this.showPresalesDialog()}
          }
        ]
        this.productService = new ProductService();
        this.save = this.save.bind(this);
        this.footer = (
          <div>
            <Button label="Send" icon="pi pi-check" onClick={this.save}/>
          </div>
        );
        
      }
    
      componentDidMount(){
        this.productService.getAll().then(data=>this.setState({products:data}));
        this.setState({
          visible : false,
          presale :{
            product_id : null,
            quantity: null,
            presale_id: null
          }
        });
      }

      save(){
        this.productService.save(this.state.presale).then(data=>{
          this.setState({response:data})
          console.log(this.state.response)
          this.displayData.push(
          <div  id="display-data">
            <pre>
              <div>
                <span>Response: {this.state.response[0].response}</span>
                <br></br>
                <span>Bill Number: {this.state.response[0].bill_id}</span>
                <br></br>
                <span>Cost: {this.state.response[0].cost}</span>
                <br></br>
                <span>Location: {this.state.response[0].site}</span>
                <br></br>
              </div>
            </pre>
          </div>);
          this.setState({
              showdata : this.displayData,
              postVal : ""
          });
        });
        /*{
            console.log(data[0]);
          });*/
      }
    
      render(){
        return(
          <div>
            <Menubar model={this.items}/>
            <br></br>
            {console.log(this.state.products)}
          <DataTable value={this.state.products}>
            <Column field="id" header="Presale Id"></Column>
            <Column field="cost" header="Cost"></Column>
            <Column field="bill_id" header="Bill Id"></Column>
            <Column field="site" header="Site"></Column>
          </DataTable>
          <Dialog header="Presales Query" visible={this.state.visible} footer={this.footer} style={{width: '50vw'}} modal={true} onHide={() => this.setState({visible: false})}>
            <span className="p-float-label">
                <InputText value={this.state.presale.product_id} style = {{width:'100%'}} id="product_id" onChange={(e) => {
                  let val= e.target.value
                  this.setState(prevState=>{
                  let presale = Object.assign({}, prevState.presale);
                  presale.product_id =val;
                  return {presale};
                })}
                } />
                <label htmlFor="in">Product Id</label>
            </span>
            <br></br>
            <span className="p-float-label">
                <InputText value={this.state.presale.count} style = {{width:'100%'}} id="count" onChange={(e) => {
                  let val= e.target.value
                  this.setState(prevState=>{
                  let presale = Object.assign({}, prevState.presale);
                  presale.count = val;
                  return {presale};
                })}
                } />
                <label htmlFor="in">Count</label>
            </span>
            <br></br>
            <span className="p-float-label">
                <InputText value={this.state.presale.presales_id}  style = {{width:'100%'}} id="presale_id" onChange={(e) => {
                  let val= e.target.value
                  this.setState(prevState=>{
                  let presale = Object.assign({}, prevState.presale);
                  presale.presales_id = val;
                  return {presale};
                })}
                } />
                <label htmlFor="in">Presale Id</label>
            </span>
            <div id="display-data-Container">
             {this.displayData}
             </div>
          </Dialog>
          </div>
        );
      }
      showPresalesDialog(){
        this.setState({
          visible : true
        })
      }
}