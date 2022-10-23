// Websocket init
const socket = io()

// Send added pictures to server
// Type in {product, category}. It's very important,
// because controller want this!
async function sendImages(type, files) {
    let maxFileSize = 5242880
    let Data = new FormData()
    $(files).each(function(index, file) {
        if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
            Data.append('images', file)
        }
    })
    return $.ajax({
        url: '/admin/upload/' + type + '/images',
        type: 'POST',
        data: Data,
        contentType: false,
        processData: false,
        success: function(data) {
            //alert('Изображения были успешно загружены')
        },
        error: function(data) {
            alert('Ошибка загрузки изображений')
        }
    })
};

// Show added pictures for admin
function showAddedImages(files, image_container) {
    if (files && files[0]) {
        $(files).each(function(index, file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                image_container.append("<img src='" + e.target.result + "' class='admin-add-image'>");
            }
            reader.readAsDataURL(file);
        })
    }
}

function register() {
    let register_admin_dto = {
        name: $("#new_admin_name").val(),
        email: $("#new_admin_login").val(),
        password: $("#new_admin_password").val(),
    }
    socket.emit("admin_register", register_admin_dto)
}

$("#admin_registration_form").on("submit", function(e) {
    e.preventDefault()
    register()
})

socket.on("admin_register_success", () => {
    alert("Admin was registered successfully!")
})

socket.on("admin_register_error", (error_message) => {
    alert("Admin was not registered!\n" + error_message)
})


async function exit() {
    $.ajax({
        url: "/auth/signout",
        type: "POST",
        contentType: "application/json",
        success: function() {
            location.href = "/admin/auth"
        }
    })
}

function make_categories_table(categories) {
    let table_container = $('#categories_table_container')
    table_container.html('')
    categories.forEach((category) => {
        let category_td = category.name + " (" + category.category_id + ")"
        for (let i = 0; i < category.products.length; ++i) {
            let tr = $("<tr>", { "class": "admin-table-row" });
            let td = $("<td>", { "class": "admin-table-element" })
            td.text(category_td)
            tr.append(td)

            td = $("<td>", { "class": "admin-table-element" })
            td.text(category.products[i].name +
                " (" + category.products[i].product_id + ")")
            tr.append(td)
            table_container.append(tr);
        }
        if (category.products.length == 0) {
            let tr = $("<tr>", { "class": "admin-table-row" });
            let td = $("<td>", { "class": "admin-table-element" })
            td.text(category_td)
            tr.append(td)

            td = $("<td>", { "class": "admin-table-element" })
            td.text("")
            tr.append(td)
            table_container.append(tr);
        }
    })
}

function make_products_table(products) {
    let table_container = $('#products_table_container')
    table_container.html('')
    products.forEach((product) => {
        let tr = $("<tr>", { "class": "admin-table-row" });
        let td = $("<td>", { "class": "admin-table-element" })
        td.text(product.name + " (" + product.product_id + ")")
        tr.append(td)

        td = $("<td>", { "class": "admin-table-element" })
        td.text(product.description)
        tr.append(td)
        table_container.append(tr);
    })
}

socket.on("render_data", (data) => {
    make_categories_table(data.categories)
    make_products_table(data.products)
})