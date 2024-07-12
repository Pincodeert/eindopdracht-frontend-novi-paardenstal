function calculateCustomersPrice(enrollmentList) {
     console.log("a whole lotta money");
     let totalPrice = 0;
     // console.log("dit is enrollment :", enrollmentList.subscriptionPrice);
     for (let i = 0; i < enrollmentList.length; i++) {
          totalPrice = totalPrice + enrollmentList[i].subscriptionPrice;

     }
     // const roundedPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100
     const roundedPrice = totalPrice.toFixed(2);
     return roundedPrice;
}

export default calculateCustomersPrice;