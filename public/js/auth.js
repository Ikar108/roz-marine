async function auth() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "/auth/signin",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                "formFields": [{
                        "id": "email",
                        "value": $("#email").val(),
                    },
                    {
                        "id": "password",
                        "value": $("#password").val(),
                    }
                ]
            }),
            success: function(response) {
                if (response.status == "FIELD_ERROR") {
                    alert("Incorrect credentials format")
                    return
                }
                if (response.status == "WRONG_CREDENTIALS_ERROR") {
                    alert("Incorrect login or password")
                    return
                }
                location.href = "/admin"
            }
        })
    })
}

$("#admin_auth").on("submit", async function(e) {
    e.preventDefault()
    const result = await auth()
})