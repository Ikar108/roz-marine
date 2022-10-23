//Image previews for category
$("#create_category_image_file").change(function() {
    let category_image_container = $('#create_category_image_container');
    category_image_container.children().remove();
    if (this.files.length == 1) {
        showAddedImages(this.files, category_image_container);
    } else {
        alert("Only one file can be loaded!")
        this.value = '';
    }
});

//Image previews for category
$("#update_category_image_file").change(function() {
    let category_image_container = $('#update_category_image_container');
    category_image_container.children().remove();
    if (this.files.length == 1) {
        showAddedImages(this.files, category_image_container);
    } else {
        alert("Only one file can be loaded!")
        this.value = '';
    }
});

//Image previews for slider
$("#create_slider_image_file").change(function() {
    let slider_image_container = $('#create_category_slider_container');
    slider_image_container.children().remove();
    if (this.files.length == 1) {
        showAddedImages(this.files, slider_image_container);
    } else {
        alert("Only one file can be loaded!")
        this.value = '';
    }
});

//Image previews for slider
$("#update_slider_image_file").change(function() {
    let slider_image_container = $('#update_category_slider_container');
    slider_image_container.children().remove();
    if (this.files.length == 1) {
        showAddedImages(this.files, slider_image_container);
    } else {
        alert("Only one file can be loaded!")
        this.value = '';
    }
});


// Create category
$("#create_category_form").on('submit', async function(e) {
    e.preventDefault()
    let form = new FormData(e.target)

    let image_path = await sendImages('category', $('#create_category_image_file')[0].files)
        .then(function(data) {
            if (data && data.file_paths.length > 0) {
                return data.file_paths[0]
            } else {
                return ''
            }
        })

    let slider_path = await sendImages('category', $('#create_slider_image_file')[0].files)
        .then(function(data) {
            if (data && data.file_paths.length > 0) {
                return data.file_paths[0]
            } else {
                return ''
            }
        })

    let create_category_dto = {
        name: form.get('name'),
        image_path: image_path,
        slider_path: slider_path
    }
    console.log(create_category_dto)
    socket.emit('create_category', create_category_dto)
})

// Response
socket.on("create_category_success", () => {
    console.log("Category was created successfuly!")
})
socket.on("create_category_error", () => {
    console.log("Category was not created successfuly!")
})

// Update category
$("#update_category_form").on('submit', async function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let image_path = await sendImages('category', $('#update_category_image_file')[0].files)
        .then(function(data) {
            if (data && data.file_paths.length > 0) {
                return data.file_paths[0]
            } else {
                return ''
            }
        })

    let slider_path = await sendImages('category', $('#update_slider_image_file')[0].files)
        .then(function(data) {
            if (data && data.file_paths.length > 0) {
                return data.file_paths[0]
            } else {
                return ''
            }
        })

    let update_category_dto = {
        category_id: form.get('category_id'),
        name: form.get('name'),
        image_path: image_path,
        slider_path: slider_path
    }
    console.log(update_category_dto)
    socket.emit('update_category', update_category_dto)
})

// Response
socket.on("update_category_success", () => {
    console.log("Category was updated successfuly!")
})
socket.on("update_category_error", () => {
    console.log("Category was not updated successfuly!")
})

// Delete category
$("#delete_category_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let delete_category_dto = {
        category_id: form.get('category_id')
    }
    if (!delete_category_dto.category_id) {
        alert("You do not choose category to delete!")
    }
    console.log(delete_category_dto)
    socket.emit('delete_category', delete_category_dto)
})

// Response
socket.on("delete_category_success", () => {
    console.log("Category was deleted successfuly!")
})
socket.on("delete_category_error", () => {
    console.log("Category was not deleted successfuly!")
})

// Add products to category by ids
$("#add_product_to_category_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let add_product_category_dto = {
        category_id: form.get('category_id'),
        product_ids: form.get('product_ids')
    }
    console.log(add_product_category_dto)
    socket.emit('add_product_category', add_product_category_dto)
})

// Response
socket.on("add_product_category_success", () => {
    console.log("Products were added to category successfuly!")
})
socket.on("add_product_category_error", () => {
    console.log("Products were not added to category!")
})

// Delete product from category by ids
$("#delete_product_from_category_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let delete_product_category_dto = {
        category_id: form.get('category_id'),
        product_ids: form.get('product_ids')
    }
    console.log(delete_product_category_dto)
    socket.emit('delete_product_category', delete_product_category_dto)
})

// Response
socket.on("delete_product_category_success", () => {
    console.log("Products were deleted from category successfuly!")
})
socket.on("delete_product_category_error", () => {
    console.log("Products were not deleted from category!")
})