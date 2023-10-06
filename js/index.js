// Dom functions

const object_container = document.getElementById("orders_list");
const nameInput = document.getElementById("name_input");
const destinationInput = document.getElementById("destination_input");
const brandInput = document.getElementById("brand_input");
const order_dateInput = document.getElementById("order_date_input");
const priceInput = document.getElementById("price_input");
const input_search = document.getElementById("input_search")
const count_price = document.getElementById("count_price")


let objects = [];
let id = 0;

const object_template = ({ id, full_name, destination, car_brand, order_date, price }) => `
<li id="${id}" class="item">
    <div class="card">
    <h4 class="card-type">Name: ${full_name}</h4>
    <h4 class="card-price">Destination: ${destination}</h4>
    <h4 class="card-brand">Brand: ${car_brand}</h4>
    <h4 class="card-production-date">Date: ${order_date}</h4>
    <h4 class="card-production-date">Price: ${price}$</h4>
    <div class="block_btn">
    <button id="edit_btn${id}" type="button" class="btn-primary btn_card" onclick="editFunc(${id})">
        Edit
    </button>
    <button type="button" id="cancel_search_btn" class="btn_card_cansel">Delete</button></div>
    </div>
</li>`;

const oject_count_template = (count) => `<h4>${count}$</h4>`

const clear_inputs = () => {
    nameInput.value = "";
    destinationInput.value = "";
    order_dateInput.value = "";
    priceInput.value = "";
}


const add_object_to_page = ({ id, full_name, destination, car_brand, order_date, price }) => {
    object_container.insertAdjacentHTML(
        "beforeend",
        object_template({ id, full_name, destination, car_brand, order_date, price })
    );
};

const object_list_search = (objects) => {
    object_container.innerHTML = "";
    for (let obj of objects) {
        add_object_to_page(obj)
    }
}

const add_count_price = (price) => {
    count_price.innerHTML = "";
    count_price.insertAdjacentHTML(
        "beforeend",
        oject_count_template(price)
    );
};

const get_values = () => {
    return {
        full_name: nameInput.value,
        destination: destinationInput.value,
        car_brand: brandInput.value,
        order_date: order_dateInput.value,
        price: priceInput.value,
    };
};


const add_object = ({ full_name, destination, car_brand, order_date, price }) => {
    const new_object = {
        id: id,
        full_name: full_name,
        destination: destination,
        car_brand: car_brand,
        order_date: order_date,
        price: price,
    };
    id += 1;
    objects.push(new_object);
    add_object_to_page(new_object);

}

// Event Block

const add_button = document.getElementById("submit_btn")
const search_button = document.getElementById("search_btn")
const cancel_button = document.getElementById("cancel_search_btn")
const sort_button = document.getElementById("sort_objects")
const count_price_btn = document.getElementById("count_price_btn")

add_button.addEventListener("click", (event) => {
    // Prevents default page reload on submit
    event.preventDefault();

    const { full_name, destination, car_brand, order_date, price } = get_values();
    add_object({ full_name, destination, car_brand, order_date, price })
    toggleMainPage();
    clear_inputs();
})


search_button.addEventListener("click", (event) => {
    const find_object = objects.filter(
        (obj) => obj.full_name.search(input_search.value) !== -1
    );
    object_list_search(find_object);
}
);

cancel_button.addEventListener("click", () => {
    input_search.value = "";
    object_list_search(objects);
}
)

sort_button.addEventListener("change", function () {
    if (this.checked) {
        const sort_objects = objects.slice();
        sort_objects.sort(function (a, b) {
            let priceA = Number(a.price),
                priceB = Number(b.price);
            if (priceA < priceB) return -1;
            if (priceA > priceB) return 1;
            return 0;
        });
        object_list_search(sort_objects);

    } else {
        object_list_search(objects);
    }
}
)

count_price_btn.addEventListener("click", () => {
    let count = 0;
    const x = objects.filter(o => count += Number(o.price));
    add_count_price(count);
})


// Toggle functions

const CLOSE_CLASSNAME = "close";
const OPEN_CLASSNAME = "open";

const mainPage = document.getElementById("main_page");
const createPage = document.getElementById("create_page");


function toggleMainPage() {
    if (mainPage.classList.contains(CLOSE_CLASSNAME)) {
        mainPage.classList.remove(CLOSE_CLASSNAME);
    }
    if (createPage.classList.contains(OPEN_CLASSNAME)) {
        createPage.classList.remove(OPEN_CLASSNAME);
    }
}

function toggleCreatePage() {
    console.log("CREATE BLOCK");
    if (!mainPage.classList.contains(CLOSE_CLASSNAME)) {
        mainPage.classList.add(CLOSE_CLASSNAME);
    }
    if (!createPage.classList.contains(OPEN_CLASSNAME)) {
        createPage.classList.add(OPEN_CLASSNAME);
    }
}