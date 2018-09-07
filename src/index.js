document.addEventListener('DOMContentLoaded', function() {

  const imageId = 85 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')














  fetch(imageURL)
  .then(response => response.json())
  .then(image => {

    imageCard.append(showImage(image))
  })




  imageCard.addEventListener('click', (event) => {
     if (event.target.classList.contains('like-btn')) {
       let parent = event.target.parentNode
       let imageLikes = parent.querySelector('.image-likes')

       imageLikes.innerText = parseInt(imageLikes.innerText) +1




       fetch(imageURL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           image_id: image.id,
           like_count: parseInt(imageLikes.innerText) +1
         })
       }).then(response => response.json())
         .then(data => imageLikes.innerText = data.likes)
     }
   })









function showImage(image){
  let showImage = document.createElement('div')
  showImage.setAttribute('data-id', image.id)
  showImage.innerHTML = `
   <h2>${image.name}</h2>
   <img src='${image.url}' class='toy-avatar'>
   <p>
    <span class='image-likes'>  ${image.like_count}  </span>     Likes</p>
   <button class='like-btn'>Like</button>
   <form id="comment_form">
     <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
     <input type="submit" value="Submit"/>
   </form>
   <ul id="comments">
   `

   return showImage

}




})
