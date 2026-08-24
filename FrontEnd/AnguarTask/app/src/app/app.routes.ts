import { Routes } from '@angular/router';
import { SigninComponent } from './Components/signin-component/signin-component';
import { HomeComponent } from './Components/home-component/home-component';
import { ItemDetails } from './Components/item-details/item-details';
import { AllOrders } from './Components/all-orders/all-orders';
import { OrderDetails } from './Components/order-details/order-details';
import { UpdateItem } from './Components/update-item/update-item';
import { CreateCategory } from './Components/create-category/create-category';
import { AllReceiptsComponent } from './Components/all-receipts-component/all-receipts-component';
import { CreateItem } from './Components/create-item/create-item';
import { ReceiptComponent } from './Components/receipt-component/receipt-component';
import { PaymentPage } from './Components/payment-page/payment-page';
import { RefreshTokenComponent } from './Components/refresh-token-component/refresh-token-component';
import { ActiveOrder } from './Components/active-order/active-order';


export const routes: Routes = [
    {
        path:'',
        loadComponent:()=> import('./Components/signin-component/signin-component')
        .then(a=>a.SigninComponent)
    },
    {
        path:'home',
        loadChildren:()=>import('../app/HomeRoutes').then(a=>a.Home_Routes)
    },
    
];
