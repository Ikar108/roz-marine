// Send added product pictures to server
async function sendProductImages(files) {
    let maxFileSize = 5242880
    let Data = new FormData()
    $(files).each(function(index, file) {
        if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
            Data.append('images', file)
        }
    })
    return $.ajax({
        url: '/admin/upload/product/images',
        type: 'POST',
        data: Data,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Изображения были успешно загружены')
        },
        error: function(data) {
            alert('Ошибка загрузки изображений')
        }
    })
};


$("#create_product_form").on('submit', function(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    sendProductImages($('#product_image_files')[0].files)
        .then(function(data) {
            if (data) {
                let create_product_dto = {
                    name: form.get('name'),
                    description: form.get('description'),
                    category: form.get('category'),
                    image_paths: data.file_paths
                }
                console.log(create_product_dto)
                    //socket.emit('create_product', create_product_dto)
            }
        })
})

// Show added product pictures for admin
function showAddedProductImages(files, image_container) {
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

$("#product_image_files").change(function() {
    let product_image_container = $('#product_image_container');
    product_image_container.children().remove();
    if (this.files.length < 11) {
        showAddedProductImages(this.files, product_image_container);
    } else {
        alert("Can't load more than 10 files!")
        this.value = '';
    }
});