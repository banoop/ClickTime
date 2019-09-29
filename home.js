var itemAmounts = {"4DVD":0, "5DVD":0, "6DVD":0, "4RAY": 0, "5RAY":0,"6RAY":0}
var itemsList = ["4DVD","5DVD","6DVD","4RAY","5RAY","6RAY"]
var DVDDiscount = false;
var BluRayDiscount = false; 
var bulkDiscount = false; 
function addItem(){
    var itemNum = parseInt(document.getElementById("itemNumber").value);
    var itemType = document.getElementById("itemType").selectedIndex;
    itemAmounts[itemsList[itemType]] +=  itemNum;
    updateValues();
}
function updateValues(){
    var vals = document.getElementsByClassName("amount");
    for(i = 0; i < vals.length; i ++){
        vals[i].value = itemAmounts[itemsList[i]];
    }
    for(i = 0; i < itemsList.length; i ++){
        if(itemAmounts[itemsList[i]] > 0){
            document.getElementById(itemsList[i]).style.display='block';
        }
    }
    updateDiscounts();
}
function updateCart(){
    var vals = document.getElementsByClassName("amount");
    for(i = 0; i < vals.length; i ++){
        itemAmounts[itemsList[i]] = vals[i].value;
    }
    for(i = 0; i < itemsList.length; i ++){
        if(itemAmounts[itemsList[i]] > 0){
            document.getElementById(itemsList[i]).style.display='block';
        }
    }
    updateDiscounts();
}

function updatePrice(){
    var total = 0;
    for(i = 0; i < itemsList.length; i ++){
        var price = 20;
        if(itemsList[i].substring(1) === 'RAY'){
            price = 25;
        }
        if(itemsList[i].substring(1) == 'DVD' && DVDDiscount){
            total += 0.9 * price * itemAmounts[itemsList[i]];
        }else if(itemsList[i].substring(1) == 'RAY' && BluRayDiscount){
            total += 0.85 * price * itemAmounts[itemsList[i]];
        }
        total += price * itemAmounts[itemsList[i]];
    }
    if(bulkDiscount){
        total = total * 0.95;
    }
    total = total.toFixed(2);
    document.getElementById('priceVal').innerHTML = '$' + total;
}
function deleteItem(elem){
    var item = elem.parentNode.id;
    itemAmounts[item] = 0;
    elem.parentNode.style.display = 'none';
    updateDiscounts();
}
function updateDiscounts(){
    if(itemAmounts["4DVD"] > 0 && itemAmounts["5DVD"] > 0  && itemAmounts["6DVD"] > 0 ){
        DVDDiscount = true;
        console.log('its been set to true');
        document.getElementById('DVDDisc').style.display = 'block';
    }
    if(itemAmounts["4RAY"] > 0 && itemAmounts["5RAY"] > 0  && itemAmounts["6RAY"] > 0 ){
        BlueRayDiscount = true;
        document.getElementById('RayDisc').style.display = 'block';

    }
    var totalAmount = 0;
    for(i = 0; i < itemsList.length; i ++){
        totalAmount += itemAmounts[itemsList[i]]; 
    }
    if(totalAmount >= 100){
        bulkDiscount = true;
        document.getElementById('BulkDisc').style.display = 'block';
    }
    updatePrice();
}

