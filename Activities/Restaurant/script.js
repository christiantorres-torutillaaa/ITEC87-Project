var oldNum = 0;

function getPrice(name, price, event){
	
	var container = document.getElementById('orders');

    var quantityElement = event.target.parentElement.querySelector('.order-quantity');
    var quantityValue = quantityElement.value;
	
	if(quantityValue==""){
		window.alert('Input Quantity');
	}else{
		
		var emptyOrder = document.getElementById('no-order');
		emptyOrder.innerHTML = "";
		
		
		let product = name;
		let prodPrice = price;

		
		
		var container = document.getElementById('orders');

		var quantityElement = event.target.parentElement.querySelector('.order-quantity');
		var quantityValue = quantityElement.value;

		var subTotal = prodPrice*quantityValue;

		var addElementprodName = document.createElement('p');
		addElementprodName.textContent = quantityValue.toString() + "x      " + product + " ..................... P" + subTotal.toString() ;   
		container.appendChild(addElementprodName);

		let totalnum = oldNum += subTotal;
		

		total = document.getElementById('totalprice');
		total.innerHTML = "Total Amount: P" + totalnum.toString();
		
	}
	
	
	
	
	
}

