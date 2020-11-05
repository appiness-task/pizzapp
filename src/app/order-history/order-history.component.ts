import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.less']
})
export class OrderHistoryComponent implements OnInit {

  expandSet = new Set<number>();

  isVisible = false;
  isOkLoading = false;

  orderDetail: any;

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

  listOfData: order[] = [
    {
      id: 1,
      name: 'John Brown',
      mobile: "+91 0987654",
      expand: false,
      address: 'New York No. 1 Lake Park',
      order_status: 1,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "chennai",
        delivery_address: "vellore",
        address_type: 1,
        total_items: 3,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    },
    {
      id: 2,
      name: 'Jim Green',
      mobile: "+91 0987654",
      expand: false,
      address: 'London No. 1 Lake Park',
      order_status: 1,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "madurai",
        delivery_address: "trichy",
        address_type: 1,
        total_items: 3,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    },
    {
      id: 3,
      name: 'Joe Black',
      mobile: "+91 0987654",
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      order_status: 1,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "sivakasi",
        delivery_address: "madurai",
        address_type: 1,
        total_items: 1,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    },

    {
      id: 4,
      name: 'Joe Black',
      mobile: "+91 0987654",
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      order_status: 2,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "sivakasi",
        delivery_address: "madurai",
        address_type: 1,
        total_items: 3,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    },
    {
      id: 5,
      name: 'Joe Black',
      mobile: "+91 0987654",
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      order_status: 3,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "sivakasi",
        delivery_address: "madurai",
        address_type: 1,
        total_items: 3,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    },
    {
      id: 6,
      name: 'Joe Black',
      mobile: "+91 0987654",
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      order_status: 4,
      orderHistory: [
        {
          date: "01/10/2020 23:23:10",
          status: "Order Received"
        },
        {
          date: "01/10/2020 23:35:10",
          status: "Preparing"
        },
        {
          date: "01/10/2020 23:50:10",
          status: "Ready to serve"
        }
      ],
      order_details: {
        shopname: "KFC",
        pickup_address: "sivakasi",
        delivery_address: "madurai",
        address_type: 1,
        total_items: 3,
        total_amount: 540,
        order_items: [
          {
            item_name: "Pizza",
            quantity: 3,
            price: 90
          },
          {
            item_name: "Burger",
            quantity: 3,
            price: 70
          },
          {
            item_name: "Dosa",
            quantity: 2,
            price: 30
          }
        ]

      }
    }
  ];

  getStatus(order_status) {
    console.log();

    if (order_status === 1) {
      return "Order Received"
    } else if (order_status === 2) {
      return "Preparing"
    } else if (order_status === 3) {
      return "Ready to Serve"
    } else {
      return "Delivered"
    }
  }

  getTotalItemPrice(quantity, price) {
    return quantity * price;
  }

  updateOrder(order) {
    let orderCopy = this.listOfData;
    order.order_status += 1;
    const foundIndex = orderCopy.findIndex(({ id }) => id === order.id);
    this.listOfData.splice(foundIndex, 1, order)
  }

  getColor(status) {
    if (status === 1) {
      return "blue"
    } else if (status === 2) {
      return "yellow"
    } else if (status === 3) {
      return "orange"
    }
    else {
      return "green"
    }
  }

  showModal(id): void {
    this.isVisible = true;
    this.orderDetail = this.listOfData.find((val) => id === val.id)
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}


interface order {
  id: number
  name: String,
  mobile: String
  expand: Boolean,
  address: String,
  order_status: number,
  orderHistory: Object,
  order_details: Object

}