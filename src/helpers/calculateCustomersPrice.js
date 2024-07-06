function calculateCustomersPrice(enrollmentList) {
     console.log("a whole lotta money");
     let totalPrice = 0;
     // console.log("dit is enrollment :", enrollmentList.subscriptionPrice);
     for (let i = 0; i < enrollmentList.length; i++) {
          totalPrice = totalPrice + enrollmentList[i].subscriptionPrice;

     }
     return totalPrice;
}

export default calculateCustomersPrice;