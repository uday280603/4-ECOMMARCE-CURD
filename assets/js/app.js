const cl = console.log;

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

const form = document.getElementById('form');
const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');

Products = [
     {
    product_id :uuidv4(),
    product_name: "iPhone 15Pro",
    category: "Smartphones",
    brand: "Apple",
    price: 999.99
  },
  {
    product_id :uuidv4(),
    product_name: "Galaxy S24 Ultra",
    category: " Smartphones",
    brand: "Samsung",
    price: 1299.99
  },
  {
    product_id :uuidv4(),
    product_name: "MacBook Air M2",
    category: " Laptops",
    brand: "Apple",
    price: 1199.99
  }
];


let productContainer = document.getElementById('productContainer');
 function createArray(Array){
    let result = ``;
    Array.forEach((element,i) => {

        result += `
          <tr id="${element.product_id}">  
                <td>${i+1}</td>
                <td>${element.product_name}</td>
                <td>${element.category}</td>
                <td>${element.brand}</td>
                <td>${element.price}</td>
                <td><i class="fa-solid fa-pen-to-square text-success fa-2x" role="button"></i></td>
                <td><i class="fa-solid fa-trash-can text-danger fa-2x" role="button"></i></td>
              </tr>
         `
        
    });
    productContainer.innerHTML = result;
 };
 createArray(Products);


 function formSubmitEvent(ele){
  ele.preventDefault();
  
  productObj ={
    
    product_id :uuidv4(),
    product_name: productName.value,
    category:productCategory.value,
    brand: productBrand.value,
    price: productPrice.value
  }

  form.reset();
  Products.unshift(productObj);

  //creating new of new data
  let tr =  document.createElement('tr');
   tr.id = productObj.product_id;

  tr.innerHTML = `
                
                <td>1</td>
                <td>${productObj.product_name}</td>
                <td>${productObj.category}</td>
                <td>${productObj.brand}</td>
                <td>${productObj.price}</td>
                <td><i onclick="editHandler(this)" class="fa-solid fa-pen-to-square text-success fa-2x" role="button"></i></td>
                <td><i onclick="deleteHandler(this)" class="fa-solid fa-trash-can text-danger fa-2x" role="button"></i></td>
  
  `

productContainer.prepend(tr);
Swal.fire({

    title: `New Prouct ${productObj.product_name} added Successfully..!`,
    timer: 3000,
})
 }

form.addEventListener('submit',formSubmitEvent);




//for edit control
function editHandler(){
  cl("edit Button Pressed..!");
}

//for delete Controle
function deleteHandler(ele){
 
  let REMOVE_ID = ele.closest('tr').id;
  //cl(REMOVE_ID);
  let getIndex1 = Products.findIndex(i => i.product_id ===  REMOVE_ID);
  Products.splice(getIndex1,1);
  ele.closest('tr').remove();
}

