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
    await allUsers.forEach(user => {
        let posts = allPosts.filter(p => {
            return user.id == p.userId
        });
        showUserPosts(user, posts);
    });
}

function showUserPosts(user, posts) {
    let container = $("#container");
    let divCard = $('<div>', {'class': 'card'});
    let table = $('<table>', {'class': 'table'});
    let tr = $('<tr>');
    let indexTr = $('<tr>');
    let tbody = $('<tbody>');

    let trIndex = $('<tr>').append($('<td>', { 'class': 'text-center', 'colspan':'4', 'html': '# ' + user.id}));;
    let trName = $('<tr>');
    trName.append($('<td>', {'colspan':'2', 'html':'Name'}), $('<td>', {'colspan': '2', 'html':user.name}));
    let trUsername = $('<tr>');
    trUsername.append($('<td>',{'html':'Username'}), $('<td>',{'html':user.userName}), $('<td>',{'html':'Email'}), $('<td>',{'html':user.email}));
    let trAddres = $('<tr>');
    trAddres.append($('<td>',{ 'class': 'text-center', 'colspan': '4', 'html': 'Address' }));
    let trStreet = $('<tr>');
    trStreet.append($('<td>',{'html':'Street'}), $('<td>',{'html':user.address.street}), $('<td>',{'html':'Suite'}), $('<td>',{'html':user.address.suite}));
    let trCity = $('<tr>');
    trCity.append($('<td>',{'html':'City'}), $('<td>',{'html':user.address.city}), $('<td>',{'html':'Zipcode'}), $('<td>',{'html':user.address.zipcode}));
    let trLocation = $('<tr>');
    trLocation.append($('<td>',{ 'class': 'text-center', 'colspan': '4', 'html': 'Location' }));
    let trLat = $('<tr>');
    trLat.append($('<td>',{'html':'Latitude'}), $('<td>',{'html':user.address.geo.lat}), $('<td>',{'html':'Longitude'}), $('<td>',{'html':user.address.geo.lng}));
    let trPhone = $('<tr>');
    trPhone.append($('<td>',{'html':'Phone'}), $('<td>',{'html': user.phone}), $('<td>',{'html':'Website'}), $('<td>',{'html':user.website}));
    let trCompany = $('<tr>');
    trCompany.append($('<td>',{ 'class': 'text-center', 'colspan': '4', 'html': 'Company' }));
    let trCompanyname = $('<tr>');
    trCompanyname.append($('<td>',{'html':'Company name'}), $('<td>',{'html': user.company.name}), $('<td>',{'html':'Business'}), $('<td>',{'html':user.company.bs}));
    let trCatch = $('<tr>');
    trCatch.append($('<td>', {'html':'Catch phrase'}), $('<td>',{'colspan':'3', 'html': user.company.catchPhrase}));
    let trPosts = $('<tr>');
    trPosts.append($('<td>',{ 'class': 'text-center', 'colspan': '4', 'html': 'POSTS' }));
    tbody.append(trIndex, trName, trUsername, trAddres, trStreet, trCity, trLocation, trLat, trPhone, trCompany, trCompanyname, trCatch, trPosts);
    tbody.append();
    posts.forEach(post => {
        let classRow = '';
        if(Number(post.id) % 2 == 0) {
            classRow = 'grayBack'
        }
        let trTitle = $('<tr>');
        trTitle.append($('<td>', {'html':'Title'}), $('<td>',{'colspan':'3', 'html': post.title}));
        let trContent = $('<tr>');
        trContent.append($('<td>', {'html':'Content'}), $('<td>',{'colspan':'3', 'html': post.body}));
        tbody.append(trTitle, trContent);
    });
    table.append(tbody);
    divCard.append(table);
    container.append(divCard);
}