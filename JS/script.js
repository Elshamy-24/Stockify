const productName= document.getElementById('productName');
const productPrice= document.getElementById('productPrice');
const productCategory = document.getElementById('productCategory');
const productdescription = document.getElementById("productDesc");
const productImg = document.getElementById("productImg");
const searchInput = document.getElementById("search");
const saveChangesBtn = document.getElementById("saveChanges");
const cancelChangesBtn = document.getElementById("cancelChanges");
const form = document.getElementById("form");
let updateIndex;
let productsList = JSON.parse(localStorage.getItem("products")) || [];
let productImgBase64 = "";
let currentProductImg = "";

// convert imgae path to Base64 string
productImg.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        currentProductImg = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

function display(displayedList) {
    let productHTML = '';
    for (let i = 0; i < displayedList.length; i++)
    {
        let realIndex = productsList.indexOf(displayedList[i]);
        productHTML += `
        <div class="card mx-auto my-5 h-auto" style="width: 20rem;">
            <img src="${displayedList[i].image}" class="card-img-top" alt="${displayedList[i].name} img">
            <div class="card-body p-3 border-top">
                <h5 class="card-title mb-1">${displayedList[i].name}</h5>
                <p class="card-text mb-2 text-muted">${displayedList[i].description}</p>
                <h6 class="mb-1"> <span class="fw-bold">Price: </span>${displayedList[i].price}</h6>
                <h6 class="mb-3"> <span class="fw-bold">Category: </span>${displayedList[i].category}</h6>
                <div class="d-flex justify-content-center gap-4 align-items-center">
                    <button class="btn btn-warning w-auto " onclick="updateProduct(${realIndex})">
                    <a href="#form" class="text-decoration-none text-dark fw-semibold">Update</a>
                    </button>
                    <button class="btn btn-danger w-auto fw-semibold" onclick="deleteProduct(${realIndex})">Delete</button>
                </div>
            </div>
        </div>`
    }
    document.getElementById('cards-section').innerHTML = productHTML;
    searchInput.classList.toggle("d-none",!productsList|| productsList.length === 0);
}
function addProduct() {
    if (productName.value === "") {   
        alert('add Product name');
        return;
    }
    const product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productdescription.value,
        image: currentProductImg
    }
    productsList.push(product);
    clearForm();
    localStorage.setItem("products", JSON.stringify(productsList));
    display(productsList);
}
function deleteProduct(deletedIndex) {
    productsList.splice(deletedIndex,1);
    localStorage.setItem("products", JSON.stringify(productsList));
    search();
}
function setFormForUpdate(index)
{
    productName.value = productsList[index].name;
    productPrice.value = productsList[index].price;
    productCategory.value = productsList[index].category;
    productdescription.value = productsList[index].description;
    currentProductImg = productsList[index].image;
}
function updateProduct(updatedIndex)
{
    setFormForUpdate(updatedIndex);
    addBtn.classList.add("d-none");
    saveChangesBtn.classList.remove("d-none");
    cancelChangesBtn.classList.remove("d-none");
    updateIndex = updatedIndex;
}
function saveChanges()
{
    productsList[updateIndex].name = productName.value;
    productsList[updateIndex].price = productPrice.value;
    productsList[updateIndex].category = productCategory.value;
    productsList[updateIndex].description = productdescription.value;
    productsList[updateIndex].image = currentProductImg;
    saveChangesBtn.classList.add("d-none");
    cancelChangesBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    localStorage.setItem("products", JSON.stringify(productsList));
    clearForm();
    display(productsList); 
}
function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productdescription.value = '';
    productImg.value = '';
    currentProductImg = '';
}
function search()
{
    let searchList = [];
    for (let i = 0; i < productsList.length; i++)
    {
        if (productsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            searchList.push(productsList[i]);
        }
    }
    display(searchList)
}
function cancelChanges() {
    clearForm();
    saveChangesBtn.classList.add("d-none");
    cancelChangesBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}
display(productsList);



