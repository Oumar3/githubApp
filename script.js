let userForm = document.querySelector('#user-form')
let usernameInput = document.querySelector('#username')
let languages = document.querySelector('.languages')
let repos = document.querySelector('#repos')
let searchItem = document.querySelector('#search-item')

languages.addEventListener('click',(e)=>{
    let lng = e.target.getAttribute('data-lng');
    if(lng){
        repos.textContent='';
        getlanguage(lng)
    }
})

async function getlanguage(lng){
    let apiUrl = 'https://api.github.com/search/repositories?q=' + lng;
    let req = await fetch(apiUrl,{method:'GET'});
    if(req.ok){
        let data = await req.json();
        console.log(data);
        displayRepos(data.items,lng)
    }else{
        console.log('Error est survenue');
    }
}


userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = usernameInput.value.trim();
    if (user) {
        repos.textContent=''
        getUserRepos(user)
        // document.querySelector('#username').value=''
    } else {
        alert('User note found!')
    }
})

async function getUserRepos(user) {
    let apiUrl = 'https://api.github.com/users/' + user + '/repos';
    let req = await fetch(apiUrl, { method: 'GET'})
    if (!req.ok) {
        alert('Une erreur est survenue, ressayez plutard')
    } else {
        let data = await req.json();
        console.log(data);
        displayRepos(data,user)
    }
}

function displayRepos(reposo,user){
    searchItem.textContent = user
    reposo.forEach(repo => {
        repos.innerHTML +=`
        <a href="#" class="repos-item">
            <span>${repo.owner.login}/${repo.name}</span>
            <span>${repo.open_issues_count} issues number</span>
        </a>
        `
    });
    // document.querySelector('#username').value='';
}

// console.log(repos);
