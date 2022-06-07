// const edit = document.getElementsByClassName("fa-user-pen");
const remove = document.getElementsByClassName("fa-trash");
const square = document.getElementsByClassName("content-text");

//put and delete - must make a fetch - server.js too
console.log('nah bruh')
// Array.from(square).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const title = this.parentNode.parentNode.querySelector('.title').innerText
//         const author = this.parentNode.parentNode.querySelector('.author').innerText
//         const numOfPages = this.parentNode.parentNode.querySelector('.numOfPages').innerText
//         const thoughts = this.parentNode.parentNode.querySelector('.thoughts').innerText
//         let favorite = true

//         element.style.background = "#00bcd45c";
//         fetch('bookshelf', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             "favorite": favorite
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           // window.location.reload(false)
//         })
//       });
// });


// Array.from(square).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const title = this.parentNode.parentNode.querySelector('.title').innerText
//         const author = this.parentNode.parentNode.querySelector('.author').innerText
//         const numOfPages = this.parentNode.parentNode.querySelector('.numOfPages').innerText
//         const thoughts = this.parentNode.parentNode.querySelector('.thoughts').innerText
//         let favorite = true

//         element.style.background = "#00bcd45c";
//         fetch('bookshelf', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             "favorite": favorite
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(false)
//         })
//       });
// });


Array.from(square).forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault()
    const title = this.parentNode.parentNode.querySelector('.title').innerText
    const numOfPages = this.parentNode.parentNode.querySelector('.numOfPages').innerText
    const thoughts = this.parentNode.parentNode.querySelector('.thoughts').innerText
    // const favorites = e.target.classList.contains('pink') ? true : false

    fetch('favorites', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': title,
        'numOfPages': numOfPages,
        'thoughts': thoughts,
        // 'favorited': favorites

      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
})
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         let thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         thumbDown--
//         fetch('books', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbDown
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
console.log('sup')
Array.from(remove).forEach(function (element) {
  console.log('gjmvjd', remove)
  element.addEventListener('click', function () {
    //  ul > li:nth-child(4) > div > h3

    const title = this.parentNode.parentNode.querySelector('.title').innerText
    const author = this.parentNode.parentNode.querySelector('.author').innerText
    const numOfPages = this.parentNode.parentNode.querySelector('.numOfPages').innerText
    const thoughts = this.parentNode.parentNode.querySelector('.thoughts').innerText
    fetch('bookshelf', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': title,
        'author': author,
        'numOfPages': numOfPages,
        'thoughts': thoughts

      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
