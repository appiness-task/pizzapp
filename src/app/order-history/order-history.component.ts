import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.less']
})
export class OrderHistoryComponent implements OnInit {

  expandSet = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }


  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      mobile: "+91 0987654",
      expand: false,
      address: 'New York No. 1 Lake Park',
      order_status: 3,
      orderHistory:[
        {
          date:"01/10/2020 23:23:10",
          status:"created"
        },
        {
          date:"01/10/2020 23:35:10",
          status:"accepted"
        },
        {
          date:"01/10/2020 23:50:10",
          status:"preparing"
        },
        {
          date:"01/10/2020 23:55:10",
          status:"Delivered"
        }
      ]
    },
    {
      id: 2,
      name: 'Jim Green',
      mobile: "+91 0987654",
      expand: false,
      address: 'London No. 1 Lake Park',
      order_status: 3,
      orderHistory:[
        {
          date:"01/10/2020 23:23:10",
          status:"created"
        },
        {
          date:"01/10/2020 23:35:10",
          status:"accepted"
        },
        {
          date:"01/10/2020 23:50:10",
          status:"preparing"
        },
        {
          date:"01/10/2020 23:55:10",
          status:"Delivered"
        }
      ]
    },
    {
      id: 3,
      name: 'Joe Black',
      mobile: "+91 0987654",
      expand: "+91 0987654",
      address: 'Sidney No. 1 Lake Park',
      order_status: 3,
      orderHistory:[
        {
          date:"01/10/2020 23:23:10",
          status:"created"
        },
        {
          date:"01/10/2020 23:35:10",
          status:"accepted"
        },
        {
          date:"01/10/2020 23:50:10",
          status:"preparing"
        },
        {
          date:"01/10/2020 23:55:10",
          status:"Delivered"
        }
      ]
    }
  ];


  getStatus(order_status){
    console.log();
    
    if(order_status === 1){
      return "Order Received"
    }else{
      if(order_status === 3){
        return "Preparing order"
      }
    }
  }

  getColor(){
    console.log("coloe");
    
    return "green"
  }
}
