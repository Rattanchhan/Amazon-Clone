function reqListener() {
    console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "http://supersimplebackend.dev");
req.send();