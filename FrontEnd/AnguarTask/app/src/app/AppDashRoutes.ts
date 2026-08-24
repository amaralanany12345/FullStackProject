import { Routes } from "@angular/router";

export const appRoutes:Routes=[
    {
        path:'',
        loadComponent:()=> import('./Components/signin-component/signin-component')
        .then(a=>a.SigninComponent)
    },
    {
        path:'home',
        loadComponent:()=> import('./Components/home-component/home-component')
        .then(a=>a.HomeComponent)
    },
    {
        path:'items/:id',
        loadComponent:()=> import('./Components/item-details/item-details')
        .then(a=>a.ItemDetails)
    },
    {
        path:'orders',
        loadComponent:()=> import('./Components/all-orders/all-orders')
        .then(a=>a.AllOrders)
    },
    {
        path:'orders/:id',
        loadComponent:()=> import('./Components/order-details/order-details')
        .then(a=>a.OrderDetails)
    },
    {
        path:'updateItem/:id',
        loadComponent:()=> import('./Components/update-item/update-item')
        .then(a=>a.UpdateItem)
    },
    {
        path:'createCategory',
        loadComponent:()=> import('./Components/create-category/create-category')
        .then(a=>a.CreateCategory)
    },
    {
        path:'createItem',
        loadComponent:()=> import('./Components/create-item/create-item')
        .then(a=>a.CreateItem)
    },
    {
        path:'receipts',
        loadComponent:()=> import('./Components/all-receipts-component/all-receipts-component')
        .then(a=>a.AllReceiptsComponent)
    },
    {
        path:'receipts/:id',
        loadComponent:()=> import('./Components/receipt-component/receipt-component')
        .then(a=>a.ReceiptComponent)
    },
    {
        path:'paymentPage/:orderId',
        loadComponent:()=> import('./Components/payment-page/payment-page')
        .then(a=>a.PaymentPage)
    },
    {
        path:'activeOrder/:orderId',
        loadComponent:()=> import('./Components/active-order/active-order')
        .then(a=>a.ActiveOrder)
    },

]