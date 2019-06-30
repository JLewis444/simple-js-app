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



        	// creates Modal
	function createModalWithDetails(responseFromAPI) {
		var item = loadDetails(responseFromAPI);

		showModal(item.name, `Height: ${item.height} Decimetres\n Weight: ${item.weight} Hectograms\n Type: ${item.type}`);

		var $modalContainer = document.querySelector('.modal');

		var modalImg = document.createElement('div');
		modalImg.classList.add('modal-img');

		var img = document.createElement('img');
		img.setAttribute('src', `${item.imageUrl}`);
		img.setAttribute('alt', `an image of ${item.name}`);

		modalImg.appendChild(img);
		$modalContainer.appendChild(modalImg);
	}

	// fires event that show modal with information
	function showModal(title, text) {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.innerHTML = '';

		var modal = document.createElement('div');
		modal.classList.add('modal');

		var closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		var titleElement = document.createElement('h2');
		titleElement.innerText = title;

		var contentElement = document.createElement('p');
		contentElement.innerText = text;

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		$modalContainer.appendChild(modal);

		$modalContainer.classList.add('is-visible');

		// Code for closing modals with 'Esc' or clicking outside the modal
		window.addEventListener('keydown', function(e) {
			var $modalContainer = document.querySelector('#modal-container');
			if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
				hideModal(true);
			}
		});

		window.addEventListener('click', function(e) {
			var target = e.target;
			var $modalContainer = document.querySelector('#modal-container');
			if (target === $modalContainer) {
				hideModal(true);
			}
		});

	}

	function hideModal(resolveOrReject=null) {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.classList.remove('is-visible');
		// If no arguments are passed, it does nothing (defaults to null).
		// Pass resolve() or reject() functions as arguments
		if (typeof(resolveOrReject) === 'function') {
			resolveOrReject();
		}
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
    var requestUrl = getAll()[item].detailsUrl;
    makeRequest(requestUrl, createModalWithDetails);
    }











 