import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AllReceiptsComponent } from "./all-receipts-component";
import { ReceiptService } from "../../Services/receipt-service";

@NgModule({
    declarations:[AllReceiptsComponent],
    imports:[RouterModule.forChild([{
        path:'',
        component:AllReceiptsComponent
    }])],
    providers:[ReceiptService]
})
 
export class AllReceiptModule{

}
