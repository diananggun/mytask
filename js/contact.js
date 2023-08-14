function submitData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (name == "") {
        return alert("Nama harus diisi");
    } else if (email == "") {
        return alert ("Email harus diisi")
    } else if (phone == "") {
        return alert ("Phone harus diisi")
    } else if (subject == "") {
        return alert ("Subject harus diisi")
    } else if (message == "") {
        return alert ("Message harus diisi")
    }

    let emailReceiver = "dianpriv@gmail.com"

    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?from=${email}&subject=${subject}&body=Halo, I am ${name}, ${message}. Let's talk with me as soon as possible. This is my phone number ${phone}`;

    a.click()
}
