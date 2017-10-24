import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  annualIncome : number;
  superPercentage : number;
  includesSuper : any;
  superAmount : number;
  netplussuper : number;
  netamount : number;
  taxamount : number;
  grossplussuper : number;
  grossamount : number;
  includesSuperFlag : boolean;
  customSuperPercentage : number;
  taxableIncome : number;
  direction = 'row';
  defaultSuperPercentage = 0.095;

  constructor() {
    this.superPercentage = this.defaultSuperPercentage;
    this.customSuperPercentage = this.superPercentage * 100;
    this.includesSuperFlag = false;
   }

  ngOnInit() {
    this.superPercentage = this.defaultSuperPercentage;
    this.customSuperPercentage = this.superPercentage * 100;
  }

  /**
   * Updates the user-defined Superannuation percentage
   * and refreshes the tax table. 
   */
  public calculateSuperPercentage(){
    this.superPercentage = this.customSuperPercentage * 0.01;
    this.calculateTax();
  }

  /**
   * Calculates Tax Amount and other associated numbers
   */
  public calculateTax(){
    if (!this.annualIncome){
      return;
    }

    this.superAmount = this.annualIncome * this.superPercentage;

    if (this.includesSuperFlag){
      this.taxableIncome =  this.annualIncome - this.superAmount;
    } else{
      this.taxableIncome = this.annualIncome;
      // Set Super Percentage back to default
      this.superPercentage = this.defaultSuperPercentage;
    }


    this.taxamount = this._calculateTaxAmount( this.taxableIncome);
    this.netamount =  this.taxableIncome -  this.taxamount;
    this.netplussuper = (this.netamount + this.superAmount);
    
    this.grossamount =  (this.annualIncome);

    if (this.includesSuperFlag){
      this.grossamount =  this.annualIncome + this.superAmount;
    }
 }

 /**
  * Calculates Tax Amount.
  * @param annualIncome 
  */
  private _calculateTaxAmount(annualIncome : number){
    if (annualIncome <= 18200.99){
      return 0;

    } else if (annualIncome >= 18201 && annualIncome <=37000.99){
      const diff = annualIncome - 18200;
      return diff * 0.19;

    } else if (annualIncome >= 37001 && annualIncome <=87000.99){
      const diff = annualIncome - 37001;
      console.log('diff = ' + diff );

      console.log((diff * 0.325));
      return (diff * 0.325) + 3572;

    } else if (annualIncome >= 87001 && annualIncome <=180000.99){
      const diff = annualIncome - 87001;
      return (diff * 0.37) + 19822;

    } else if (annualIncome >= 180001){
      const diff = annualIncome - 180001;
      return (diff * 0.45) + 54232;
    }
  }

}
