import { Routes } from '@angular/router';
import { SigninComponent } from './Components/signin-component/signin-component';
import { HomeComponent } from './Components/home-component/home-component';
import { ItemDetails } from './Components/item-details/item-details';
import { AllOrders } from './Components/all-orders/all-orders';
import { UserOrder } from './Components/user-order/user-order';
import { OrderDetails } from './Components/order-details/order-details';
import { UpdateItem } from './Components/update-item/update-item';
import { UpdateCategory } from './Components/update-category/update-category';
import { ApplyOrder } from './Components/apply-order/apply-order';
import { OrderItem } from './Components/order-item/order-item';

export const routes: Routes = [
    {path:'',component:SigninComponent},
    {path:'home',component:HomeComponent},
    {path:'items/:id',component:ItemDetails},
    {path:'orders',component:AllOrders},
    {path:'applyOrder',component:ApplyOrder},
    {path:'orderItem/:id',component:OrderItem},
    {path:'orders/:id',component:OrderDetails},
    {path:'updateItem/:id',component:UpdateItem},
    {path:'updateCategory/:id',component:UpdateCategory},
];
