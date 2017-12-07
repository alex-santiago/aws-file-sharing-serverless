(() => {
    const serviceupload = document.getElementById('serviceupload');
    const serviceinfo = document.getElementById('serviceinfo');
    const filepath = document.getElementById('filepath');
    const filename = document.getElementById('filename');
    const filedescription = document.getElementById('filedescription');
    const result = document.getElementById('result');
})();


function savefile() {
    let body = {};
    body.key = filename.value;
    body.description = filedescription.value;

    let httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener("load", transferComplete);
    httpRequest.onload = function() {
        if (this.status === 200) {
            console.log('File Saved.')
            result.innerHTML = 'File Saved.';
            filepath.value = '';
            filename.value = '';
            filedescription.value = '';
        } else {
            result.innerHTML = 'Error';
        }
    };
    console.log(serviceinfo.value);
    console.log(body);
    httpRequest.open('POST', serviceinfo.value);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(body));
}

function transferComplete(evt) {
    console.log("The transfer is complete.");

    let httpRequest = new XMLHttpRequest();

    let body = {};
    body.imageUrl = filepath.value;
    body.key = filename.value;

    httpRequest.onload = function() {
        if (this.status === 200) {
            result.innerHTML = 'File Saved. Reload Files';
            filepath.value = '';
            filename.value = '';
            filedescription.value = '';
        } else {
            result.innerHTML = 'Error';
        }
    };
    console.log(serviceupload.value);
    console.log(body);
    httpRequest.open('POST', serviceupload.value); 
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(body));
}

  function showFileList(response) {
    let jsonResponse = JSON.parse(response);

    let list = document.createElement('ul');

    jsonResponse.Items.forEach(item => {
        let listItem = document.createElement('li');
        let div = document.createElement('div');
        let paragraph1 = document.createElement('p');
        let paragraph2 = document.createElement('p');
        paragraph1.innerHTML = 'File Name: ' + item.fileName;
        paragraph2.innerHTML = 'Description: ' + item.fileDescription;
        div.appendChild(paragraph1);
        div.appendChild(paragraph2);
        listItem.appendChild(div);

        list.appendChild(listItem);
    });

    result.appendChild(list);
}

function listfiles() {
    result.innerHTML = '';

    let httpRequest = new XMLHttpRequest();
    httpRequest.onload = function() {
        result.innerHTML = '';
        if (this.status === 200) {
            showFileList(this.response);
        } else {
            result.innerHTML = 'Error';
        }
    };
    console.log(serviceinfo.value);
    httpRequest.open('GET', serviceinfo.value);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send();
}