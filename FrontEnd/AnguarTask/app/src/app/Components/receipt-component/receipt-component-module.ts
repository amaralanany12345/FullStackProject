import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReceiptComponent } from "./receipt-component";
import { ReceiptService } from "../../Services/receipt-service";
import { CartItemDetails } from "../cart-item-details/cart-item-details";

@NgModule({
    declarations:[ReceiptComponent],
    imports:[CartItemDetails,RouterModule.forChild([{
        path:'',
        component:ReceiptComponent
    }])],
    providers:[ReceiptService]
})

export class ReceiptModule{}