var pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        function add(pokemon) {
            if (typeof(pokemon) === 'object') {
                repository.push(pokemon);
            } else {
                console.log('Please add an object');
            }
        }

        function getAll() {
            return repository;
        }

        function searchByName(inputNameString) {
            return repository.filter(function (repositoryObject) {
                return repositoryObject.name.tolowerCase().indexOf(inputNameString.tolowerCase()) != -1;
            })
        }

        function addListItem(pokemonObject) {
            var $newListItem = document.createElement('li');
            var $newButton = document.createElement('button');
            var $pokeList = document.querySelector('#pokemon-list');

            $newListItem.setAttribute('class', 'pokemon-list_item');
            $newButton.setAttribute('class', 'list-item_button');
            $newListItem.appendChild($newButton);
            $pokeList.appendChild($newListItem);
            $newButton.innerText = pokemonObject.name;
           // $newButton.addEventListener('click', function(event) {
             //   showDetails(pokemonObject);
            //});
            $newButton.onclick =  () => { 
                showDetails(pokemonObject)
       //         alert(JSON.stringify(pokemonObject,null,4))
            }
            }

        function loadList() {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function (item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        }

        function loadDetails(item) {
            var url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = Object.keys(details.types);
            }).catch(function (e) {
                console.error(e);
            });
        }

        return {
            add: add,
            getAll: getAll,
            searchByName: searchByName,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails
        };
    
})();

function itemToggleOnOff() {
    var $item = document.querySelector('.item');
    $item.classList.toggle('item-blink');
}

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemonObject) {
        pokemonRepository.addListItem(pokemonObject);
    });
});

function showDetails(pokemonObject) {
    itemToggleOnOff();
    pokemonRepository.loadDetails(pokemonObject).then(function() {
        console.log(pokemonObject);
        let html = `<p> ${pokemonObject.name}  ${pokemonObject.height}</p>`
        document.querySelector('.rightSide').innerHTML=html
        itemToggleOnOff();
    });
}

//pokemonRepository.getAll().forEach(function(currentPokemon){
//    document.write('<h2 style="color:skyblue">' + currentPokemon.name + ' ' + currentPokemon.height + '</h2>');
//  document.write(currentPokemon.types);

//});








 