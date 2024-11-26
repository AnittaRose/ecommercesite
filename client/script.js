
async function add(event) {
    event.preventDefault();
    console.log('Reached.....');

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        email,
        password
    };

    console.log('data', data);

    let stringdata = JSON.stringify(data);
    console.log("string_data :", stringdata);

    try {
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringdata
        });

        console.log('response', response);

        let parsed = await response.json();
        console.log('parsed', parsed);

        let token_data = parsed.data;
        console.log('token_data', token_data);

        let user_type = token_data.user_type.user_type;


        let token = token_data.token;
        console.log(token);

        let id = token_data.id;
        console.log("id", id)

        let token_key = id;
        console.log(token_key)


        localStorage.setItem(token_key, token);
        console.log("token_key", token_key)

        if (user_type === "Admin") {
            alert("Admin logged in successfully");
            window.location.href = `Admin.html?login=${token_key}&id=${id}`;
        } else if (user_type === "Buyer") {
            alert("Buyer logged in successfully");
            window.location.href = `Buyer.html?login=${token_key}&id=${id}`;
        } else if (user_type === "Seller") {
            alert("Seller logged in successfully");
            window.location.href = `Seller.html?login=${token_key}&id=${id}`;
        } else {
            alert("Unknown user type");
        }


    } catch (error) {
        console.log("error :", error);
    }

}
async function adduser(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let phone = document.getElementById('Phone').value;
    let user_type = document.getElementById('selection_container').value;



    let data = {
        email,
        password,
        name,
        phone,
        user_type
    };

    console.log("data:", data);

    try {
        let response = await fetch('/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        console.log("response:", response);

        if (response.status === 200) {
            alert('User successfully created');
            window.location = `login.html`;
        } else {
            alert('User creation failed');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
async function Categoryfetch(event) {
    event.preventDefault();

    try {
        let response = await fetch('/Fetchcategories', {
            method: 'GET' // Capitalizing GET is more conventional but not mandatory
        });
        let parsed_data = await response.json();
        console.log("parsed_data", parsed_data);

        let data = parsed_data.data;
        console.log("data", data);

        let categoryid = document.getElementById('SelectCategories');
        let row = '<option selected disabled>Select Categories</option>';

        for (let i = 0; i < data.length; i++) { // Use i < data.length instead of i <= data.length
            row += `
                <option value="${data[i].Category}">${data[i].Category}</option>
            `;
        }
        categoryid.innerHTML = row;
    } catch (error) {
        console.log(error);
    }
}
// async function Addproducts(event){
//     event.preventDefault();
//     console.log("Form submission started");

//     const params = new URLSearchParams(window.location.search);
//     console.log(params);

//     const token_key = params.get('login');
//     console.log("token_key", token_key);

//     const token = localStorage.getItem(token_key);
//     console.log(token);

//     const Title = document.getElementById('title').value;
//     const Description = document.getElementById('description').value;
//     const Category = document.getElementById('categories')?.value;
//     const Brand = document.getElementById('brand').value;
//     const Price = document.getElementById('price').value;
//     const Rating = document.getElementById('rating').value;
//     let imageInput = document.getElementById('image');

//     let base64ImageString="";

//     if(imageInput.files && imageInput.files[0]){
//         const file = imageInput.files[0];
//         const reader = new FileReader();

//         reader.onloadend =  async function (){
//             base64ImageString = reader.result;


//             let data = {
//                 Title,
//                 Description,
//                 Category,
//                 Brand,
//                 Price,
//                 Rating,
//                 imageInput : base64ImageString
//             };

//             let strdata = JSON.stringify(data);
//             console.log('strdata', strdata);

//             try {
//                 const response = await fetch('/Add', {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json",
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: strdata,
//                 });
//                 console.log("response",response)
//                 let parsed_response = await response.json()
//                 console.log('parsed_response' ,parsed_response)

//                 if (response.status === 200) {
//                     alert('Product Added Successfully')
//                 } else {
//                     alert('something went wrong')
//                 }
//                 // window.location = `Seller.html?login=${token_key}`

//                 // console.log('response : ',response);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         reader.readAsDataURL(file);
//     }else{
//         alert("nulll")
//     }
// }
async function Addproducts(event){
    event.preventDefault();
    console.log('reached add user');  
    
    const params = new URLSearchParams(window.location.search);
    console.log(params);

    const token_key = params.get('login');
    console.log("token_key", token_key);

    const token = localStorage.getItem(token_key);
    console.log(token);

    let Title = document.getElementById('title').value;
    let Description = document.getElementById('description').value;
    let Price = document.getElementById('price').value;
    let Rating = document.getElementById('rating').value;
    let Brand = document.getElementById('brand').value;
    let Category = document.getElementById('SelectCategories').value;
    let ImageInput = document.getElementById('image');


    let base64ImageString = "";


    if (ImageInput.files && ImageInput.files[0]) {
        const file = ImageInput.files[0];
        const reader = new FileReader();
        

        reader.onloadend = async function () {
            base64ImageString = reader.result; 


            let data = {
                Title,
                Description,
                Price,
                Rating,
                Brand,
                ImageInput: base64ImageString,
                Category

            };

            let json_data = JSON.stringify(data);
            console.log("json_data", json_data);

            try {
                let response = await fetch('/Add', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: json_data,
                });
                if (response.ok) {
                    alert("Product added successfully.");
                } else {
                    alert("Something went wrong!");
                }
                // window.location='Seller.html'
                console.log('response', response);
            } catch (error) {
                console.error('Error adding Product:', error);
            }
        };

        // Start reading the file as Base64
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image.");
    }
}
async function Viewproducts(event) {
    event.preventDefault();
    console.log("Fetching product list...");

    let params = new URLSearchParams(window.location.search);


    let token_key = params.get('login');
    console.log(token_key);

    let token = localStorage.getItem(token_key);
    console.log(token);

    try {
        let response = await fetch(`/add`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(' add response',response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        let parsed_response = await response.json();
        console.log("parsed_response: ", parsed_response);

        let data = parsed_response.data;
        console.log(data);

        let datacontainer = document.getElementById('datacontainer');
        if (!datacontainer) {
            console.error("Container with id 'datacontainer' not found.");
            return;
        }

        let row = '';
        for (i = 0; i < data.length; i++) {
            row += `
            <div class="darkgreenbox">
                <div class="text-center pt-4 p-3 Allproducts">All Products</div>
                <div class="product1">
                    <div class="text-center p-2 pt-3"><img src= "${data[i].Images}" class="images"></div>
                    <div class="text-center product1font1">${data[i].Title}</div>
                    <div class="text-center product1font2">Rs.${data[i].Price}</div>
                    <div class="text-center pt-2"><button class="bttnproduct p-1">Add to Cart</button></div>
                </div>
            </div>
        `;
        }



        datacontainer.innerHTML = row;
    } catch (error) {
        console.error("Error fetching products:", error);
        // document.getElementById('datacontainer').innerHTML = "<p>Failed to load products.</p>";
    }
}
async function addpage() {
    let params = new URLSearchParams(window.location.search)

    let token_key = params.get('login');
    console.log(token_key);

    let token = localStorage.getItem(token_key);
    console.log(token);

    window.location.href = `AddProductPage.html?login=${token_key}`
}
async function Single(id) {
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let token_key = params.get('login');
    console.log('token_key', token_key);


    window.location = `Seller.html?login=${token_key}&id=${id}`
}


