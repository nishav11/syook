

function render(data) {
   var titleId=data.title.split(" ").join('');
   var html = '<ul id="postsList"><li class="listItem" id='+titleId +'><strong><b><span>'+data.title+'</span></b></strong><br><span id="desc">'+data.description+'<span><br><button class="edit-post" id='+titleId+'>Edit</button><button  class="del-post" id='+titleId+'>Delete</button></li></ul>'
    $('.list-container').append(html);
}



$(document).ready(function(){
    var comment = [];

    if(!localStorage.commentData){
        localStorage.commentData = [];
    } else {
        comment = JSON.parse(localStorage.commentData);
    }
    
    

        for(var i=0;i<comment.length;i++){
            render(comment[i]);
        }
    
// ADD POST

    $('#save').click(function(){
        var addObj = {
            "title": $('#title').val(),
            "description": $('#description').val()
        };
        // console.log(addObj);
        if(addObj.title==='' || addObj.description===''){
            return;
        }
        var commentData = comment;

        // var commentData = JSON.parse(localStorage.getItem('commentData'));
        var i=0;
        while(i<commentData.length){
            if(commentData[i].title==addObj.title)
            return;
            i++;
        }
        comment.push(addObj);
        localStorage.commentData = JSON.stringify(comment);
        render(addObj);
        $('#title').val('');
        $('#description').val('');
        document.location.reload();
    });

// EDIT POST

    $('.edit-post').click(function(){
        var editId=$(this).attr("id");
        var commentData = comment;
        // var commentData = JSON.parse(localStorage.getItem('commentData'));
        var i=0;
        while(i<commentData.length){
            if(commentData[i].title==editId){
                break;
            }
        
   
            i++;
        }
        document.getElementById('title').value= commentData[i].title;
        document.getElementById('description').value = commentData[i].description;
        commentData.splice(i, 1);
       
        console.log(commentData[i]);
       
       
       
        
        localStorage.setItem('commentData', JSON.stringify(commentData));
     

    })

// DELETE POST 
    $(".del-post").click(function(){
        var delId=$(this).attr("id");
        // var commentData = JSON.parse(localStorage.getItem('commentData'));
        var commentData = comment;
        var i=0;
        while(i<commentData.length){
            if(commentData[i].title==delId){
                break;
            }
            i++;
        }
        commentData.splice(i, 1);
        localStorage.setItem('commentData', JSON.stringify(commentData));
        document.location.reload();
    })

});


// FILTERING THE POSTS

$(document).ready(function(){
    let filterPosts = document.getElementById('filterPosts');
    filterPosts.addEventListener('keyup', filterIt);

        function filterIt() {
           let filterValue = document.getElementById('filterPosts').value.toLowerCase();
          var commentData = JSON.parse(localStorage.getItem('commentData'));
           let postList =  document.getElementById('postsList');
           let postItem =  postList.querySelectorAll('li');
            console.log(postItem);
           for(let i=0;i<commentData.length;i++){
               let span = commentData[i].title;
               var newSpan=span;
               if(span.includes(" ")){
                   newSpan=span.split(" ").join('');
               }
               if(span.toLowerCase().indexOf(filterValue) > -1){
                   document.getElementById(newSpan).style.display= '';
               } else {
                   document.getElementById(newSpan).style.display = 'none';
               }
           }
        }
})
