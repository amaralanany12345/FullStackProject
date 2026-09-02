import { NgModule } from "@angular/core";
import { PaymentPage } from "./payment-page";
import { PaymentService } from "../../Services/payment-service";
import { CartItemDetails } from "../cart-item-details/cart-item-details";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[PaymentPage],
    imports: [CartItemDetails,RouterModule.forChild([{
        path:'',
        component:PaymentPage
    }])],
    providers:[PaymentService]
})
export class PaymentPageModule{}