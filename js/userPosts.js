async function loadUsersPosts() {
    let allUsers = [];
    let allPosts = [];
    
    await getData(usersWS).then(result => {
        allUsers = result;
    });
    await getData(postsWS).then(result => {
        allPosts = result;
    });

    usersPosts = [];
    await allUsers.forEach((user) => {
        let posts = allPosts.filter(p => {
            return user.id == p.userId
        });
        showUserPosts(user, posts);
    });
}

async function showUserPosts(user, posts) {
    let container = $("#container");
    let userArray = user.name.split(' ');
    let params = new URLSearchParams({'name': userArray[0]});
    let request = getProb + "?" + params.toString();
    let FoM = 0;
    await getData(request).then(result => {
        if(!(result.gender == null)) 
            if(result.gender == "female") 
                FoM = 1;
            else
                FoM = -1;
    });
    let divCard = $('<div>', {'class': 'card'});
    let cardHead = $('<div>', {'class': 'card-head'});
    let imgSrc = imgWS;
    if(FoM > 0)
        imgSrc = imgWS + imgF;
    else 
        imgSrc += (FoM == 0) ? imgR : imgM; 
    let imgContainer = $('<div>',{'class':'img-container'}).append(
        $('<img>',{'class':'img-thumbnail', 'src': imgSrc})
    );
    let userContainer = $('<div>',{'class':'user-container'}).append(
        $('<p>',{'class':'user','html':user.name})
    );
    cardHead.append(imgContainer, userContainer);
    divCard.append(cardHead);
    posts.forEach(post => {
        let classRow = '';
        if(Number(post.id) % 2 == 0) {
            classRow = 'redText';
        }
        let row = $('<div>',{'class':'row' + ' ' + classRow, 'html': post.body});
        divCard.append(row);
    });
    container.append(divCard);
}
