export const Home_Routes=[
    {
        path:'',
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
        path:'receipts',
        loadChildren:()=> import('./Components/all-receipts-component/all-receiptsModule')
        .then(a=>a.AllReceiptModule)
    },
    {
        path:'receipts/:id',
        loadChildren:()=> import('./Components/receipt-component/receipt-component-module')
        .then(a=>a.ReceiptModule)
    },
    {
        path:'activeOrder/:orderId',
        loadComponent:()=> import('./Components/active-order/active-order')
        .then(a=>a.ActiveOrder)
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
        path:'paymentPage/:orderId',
        loadChildren:()=> import('./Components/payment-page/payment-page-module')
        .then(a=>a.PaymentPageModule)
    },
]