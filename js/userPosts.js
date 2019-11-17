async function loadUsersPosts() {
    let allUusers = [];
    let allPosts = [];
    
    await getData(usersWS).then(result => {
        allUsers = result;
    });
    await getData(postsWS).then(result => {
        allPosts = result;
    });

    usersPosts = [];
    await allUsers.forEach(user => {
        let posts = allPosts.filter(p => {
            return user.id == p.userId
        });
        usersPosts.push({
            user: user,
            posts: posts
        });
    });
    console.log(usersPosts);
}

