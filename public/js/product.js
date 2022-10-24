//Image previews for product
$("#create_product_image_files").change(function() {
    let product_image_container = $('#create_product_image_container');
    product_image_container.children().remove();
    if (this.files.length < 11) {
        showAddedImages(this.files, product_image_container);
    } else {
        alert("Can load no more than 10 files!")
        this.value = '';
    }
});

//Image previews for category
$("#update_product_image_files").change(function() {
    let product_image_container = $('#update_product_image_container');
    product_image_container.children().remove();
    if (this.files.length < 11) {
        showAddedImages(this.files, product_image_container);
    } else {
        alert("Can load no more than 10 files!")
        this.value = '';
    }
});


// Create product
$("#create_product_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    sendImages('product', $('#create_product_image_files')[0].files)
        .then(function(data) {
            if (data) {
                let create_product_dto = {
                    name: form.get('name'),
                    description: form.get('description'),
                    category_id: form.get('category_id'),
                    image_paths: data.file_paths
                }
                console.log(create_product_dto)
                socket.emit('create_product', create_product_dto)
            }
        })
})

// Response
socket.on("create_product_success", () => {
    console.log("Product was created successfuly!")
})
socket.on("create_product_error", () => {
    console.log("Product was not created successfuly!")
})

// Update product
$("#update_product_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    sendImages('product', $('#update_product_image_files')[0].files)
        .then(function(data) {
            if (data) {
                let update_product_dto = {
                    product_id: form.get('product_id'),
                    name: form.get('name'),
                    description: form.get('description'),
                    //category: form.get('category_id'),
                    image_paths: data.file_paths
                }
                console.log(update_product_dto)
                socket.emit('update_product', update_product_dto)
            }
        })
})

// Response
socket.on("update_product_success", () => {
    console.log("Product was updated successfuly!")
})
socket.on("update_product_error", () => {
    console.log("Product was not updated successfuly!")
})

// Delete product
$("#delete_product_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let delete_product_dto = {
        product_id: form.get('product_id')
    }
    console.log(delete_product_dto)
    socket.emit('delete_product', delete_product_dto)
})

// Response
socket.on("delete_product_success", () => {
    console.log("Product was deleted successfuly!")
})
socket.on("delete_product_error", () => {
    console.log("Product was not deleted successfuly!")
})