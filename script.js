let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let btnDelete = document.getElementById('deleteAll');
let search = document.getElementById('search');
let mode = 'create'
let searchMode = 'title';
function getTotal(){
    if(price.value != ''){
        
        let result = +price.value + +tax.value + +ads.value - +discount.value;
        total.innerHTML=result;
        total.style.background = '#040';
    }
    else
    {
        total.innerHTML='Total:';
        total.style.background = 'rgb(101, 36, 36)';
    }
}
//create data
let dataPro;
if(localStorage.products !=null){
    dataPro = JSON.parse(localStorage.getItem('products'));
}
else{
    dataPro=[];
}
let y;
create.onclick = ()=>{
    let product={
        title:title.value,
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(title.value != '' && price.value != '' && category.value != '' && product.count <= 100){
        if(mode==='create'){
            if(product.count > 1)
                for(let i =0;i<product.count;i++)
                    dataPro.push(product);
            else
                dataPro.push(product);
            }
        else{
            dataPro[y] = product;
            mode = 'create';
            count.style.display = 'inline-block';
            create.innerHTML = 'Create'
        }
        localStorage.setItem('products',JSON.stringify(dataPro));
        clear();
        read();
    }
      
}

function clear() {
    title.value='';
    price.value='';
    tax.value='';
    ads.value='';
    discount.value='';
    total.innerHTML = 'Total: ';
    total.style.background = 'rgb(101, 36, 36)';
    count.value='';
    category.value='';
}

function read() {
    let table='';
    for(let i=0;i<dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].tax}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick='update(${i+1})'>Update</button></td>
            <td><button onclick='deleteProduct(${i+1})' id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length>0){
        btnDelete.innerHTML = `<button onclick=deleteAll()>DeleteAll</button>`
    }
    else
    {
        btnDelete.innerHTML = '';
    }
    getTotal();
}
read();

let x = []
function deleteProduct(id){
    dataPro.splice(id-1,1);
    localStorage.setItem('products',JSON.stringify(dataPro));
    read();
}
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    read();
}

function update(id) {
    y = id-1;
    title.value = dataPro[id-1].title;
    price.value = dataPro[id-1].price;
    tax.value = dataPro[id-1].tax;
    ads.value = dataPro[id-1].ads;
    discount.value = dataPro[id-1].discount;
    category.value = dataPro[id-1].category;
    count.style.display = 'none';
    create.innerHTML = 'Update';
    getTotal();
    mode = 'update';
    window.scroll({
        top:0,
        behavior:"smooth"
    });
}   
function getSearchMood(id){
    if(id=='searchTitle'){
        searchMode ='title';
        search.placeholder='Search By Title';
    }
    else{
        searchMode='category'
        search.placeholder='Search By Category';

    }
    search.focus();
}

function searchp(terms) 
{
    let table='';
    if(searchMode=='title')
    {
        for(let i=0;i<dataPro.length;i++)
        {
            if(dataPro[i].title.toLowerCase().includes(terms.toLowerCase()))
            {  
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='update(${i+1})'>Update</button></td>
                    <td><button onclick='deleteProduct(${i+1})' id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    else{
        for(let i=0;i<dataPro.length;i++)
        {
            if(dataPro[i].category.toLowerCase().includes(terms.toLowerCase()))
            {  
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='update(${i+1})'>Update</button></td>
                    <td><button onclick='deleteProduct(${i+1})' id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}