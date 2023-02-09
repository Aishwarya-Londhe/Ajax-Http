let cl = console.log;
let baseUrl = `https://jsonplaceholder.typicode.com/posts`
const postContainer = document.getElementById("postContainer");
const postForm = document.getElementById("postForm");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content");
// GET >> to get data from database
// POST >> to create/send new data in database
// DELETE >> to delete/remove data from database
// PATCH/PUT >> to update data in DB

// myflipcart.com/api >> Base API Url >> given by backend
// myflipcart.com/api/products >> we have to add endpoints for getting data
// myflipcart.com/api/products/123 >> id
// myflipcart.com/api/users
// myflipcart.com/api/users/5 >> id

// dummy API >> https://jsonplaceholder.typicode.com
// for fetching particular data >> https://jsonplaceholder.typicode.com/post/5


const templating = (arr) => {
    let result = ``
    arr.forEach(post => {
        result += `
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3>${post.title}</h3>
                        </div>
                        <div class="card-body">
                            <p>
                                ${post.body}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                  `
    });
    postContainer.innerHTML = result;
}


// xhr helps to get, send , delete data
// open method tells what to do to js engine
// xhr.open(methodName, apiUrl, isAsync) isAsync = true >> bydefault it is true
// after sending API to backend, We will get response by onload method
// the data is in JSON format we have to convert it into javaScript object.

const makeApiCall = (methodName, apiUrl, body) => {
    let xhr = new XMLHttpRequest();
    xhr.open(methodName, apiUrl);
    xhr.onload = function () {
        if (xhr.status === 200) {
            cl(xhr.readyState)
            let data = JSON.parse(xhr.response)
            templating(data)
        }else if(xhr.status === 201) {
            cl(xhr.response)
        }
    }
    xhr.send(JSON.stringify(body));
}

const onPostSubmit = (eve) => {
    eve.preventDefault();
    let obj = {
        title : titleControl.value,
        body : contentControl.value,
        userId : Math.ceil(Math.random() * 10)
    }
    cl(obj);
    postForm.reset()
    makeApiCall("POST", baseUrl, obj)
}

makeApiCall("GET", baseUrl, null)
postForm.addEventListener("submit", onPostSubmit)

// myflipcart.com/users
// myflipcart.com/api/users
// xhr.status >> 200 or 201 >> API success
// 200 while using GET method
// 201 POST method

// 404 >> URL not found
// 403 >> Forbidden
// 503 >> service not available

// xhr.readyState
// 0 >> UNset >> open method not called yet
// 1 >> OPENED >> Open method is called
// 2 >> send method is called
// 3 >> Server is working on your request
// 4 >> DONE >> Operation is completed