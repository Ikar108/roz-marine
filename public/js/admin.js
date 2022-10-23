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