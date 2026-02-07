const cl = console.log;

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

const form = document.getElementById("form");
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn')
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productBrand = document.getElementById("productBrand");
const productPrice = document.getElementById("productPrice");
Products = [
  {
    product_id: uuidv4(),
    product_name: "iPhone 15Pro",
    category: "Smartphones",
    brand: "Apple",
    price: 999.99,
  },
  {
    product_id: uuidv4(),
    product_name: "Galaxy S24 Ultra",
    category: " Smartphones",
    brand: "Samsung",
    price: 1299.99,
  },
  {
    product_id: uuidv4(),
    product_name: "MacBook Air M2",
    category: " Laptops",
    brand: "Apple",
    price: 1199.99,
  },
];

function snackbar(msg) {
  Swal.fire({
    title: msg,
    icon: "success",
    timer: 3000,
  });
}
let productContainer = document.getElementById("productContainer");
function createArray(Array) {
  let result = ``;
  Array.forEach((element, i) => {
    result += `
          <tr id="${element.product_id}">  
                <td>${i + 1}</td>
                <td>${element.product_name}</td>
                <td>${element.category}</td>
                <td>${element.brand}</td>
                <td>${element.price}</td>
                <td><i onclick="editHandler(this)" class="fa-solid fa-pen-to-square text-success fa-2x" role="button"></i></td>
                <td><i onclick="deleteHandler(this)" class="fa-solid fa-trash-can text-danger fa-2x" role="button"></i></td>
              </tr>
         `;
  });
  productContainer.innerHTML = result;
}
createArray(Products);

function formSubmitEvent(ele) {
  ele.preventDefault();

  productObj = {
    product_id: uuidv4(),
    product_name: productName.value,
    category: productCategory.value,
    brand: productBrand.value,
    price: productPrice.value,
  };

  form.reset();
  Products.unshift(productObj);

  //creating new of new data
  let tr = document.createElement("tr");
  tr.id = productObj.product_id;

  tr.innerHTML = `
                
                <td>${Products.length}</td>
                <td>${productObj.product_name}</td>
                <td>${productObj.category}</td>
                <td>${productObj.brand}</td>
                <td>${productObj.price}</td>
                <td><i onclick="editHandler(this)" class="fa-solid fa-pen-to-square text-success fa-2x" role="button"></i></td>
                <td><i onclick="deleteHandler(this)" class="fa-solid fa-trash-can text-danger fa-2x" role="button"></i></td>
  
  `;
  
  productContainer.append(tr);
  snackbar(`${productObj.product_name} Added successfully in database...!!`);
}

//for delete Controle
function deleteHandler(ele) {
  let REMOVE_ID = ele.closest("tr").id;
  let getConfirm = confirm(
    `Are you sure, youw want to remove ${REMOVE_ID} product...?`,
  );
  if (getConfirm) {
    let getIndex1 = Products.findIndex((i) => i.product_id === REMOVE_ID);
    let newList = Products.splice(getIndex1, 1);
    ele.closest("tr").remove();
    let allTds = [...document.querySelectorAll('#productContainer tr td:first-child')];
    allTds.forEach((td,i) =>{
      td.innerText = i +1;
    })
    snackbar(`Product ${newList[0].product_name} is removed successfully...!`);
  }
}

//for edit control
let EDIT_ID;
function editHandler(ele) {
  
  EDIT_ID = ele.closest('tr').id;
  let EDIT_OBJ = Products.find( p => p.product_id === EDIT_ID);
  
  productName.value = EDIT_OBJ.product_name;
  productCategory.value = EDIT_OBJ.category;
  productBrand.value = EDIT_OBJ.brand;
  productPrice.value = EDIT_OBJ.price;

  addProductBtn.classList.add('d-none');
  updateProductBtn.classList.remove('d-none');


}

updateProductBtn.type = "button";
function onProductUpadteHandler(ele){
  let UPDATE_OBJ = {
    product_id: EDIT_ID,
    product_name: productName.value,
    category: productCategory.value,
    brand: productBrand.value,
    price: productPrice.value,
  };
  console.log(UPDATE_OBJ);
  form.reset();
  let getIndex = Products.findIndex( p => p.product_id === EDIT_ID );
  Products[getIndex] = UPDATE_OBJ;

  let tr = [...document.getElementById(EDIT_ID).children];
  tr[1].innerText = UPDATE_OBJ.product_name;
  tr[2].innerText = UPDATE_OBJ.category;
  tr[3].innerText = UPDATE_OBJ.brand;
  tr[4].innerText = UPDATE_OBJ.price; 
  snackbar( `The Product ${UPDATE_OBJ.product_name} is updated succesfulyy....`);
  addProductBtn.classList.remove('d-none');
  updateProductBtn.classList.add('d-none');
}

form.addEventListener('submit', formSubmitEvent);
updateProductBtn.addEventListener('click', onProductUpadteHandler)
