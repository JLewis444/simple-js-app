var pokemonRepository = (function () {
    var repository = [
        {
            name : 'Fearow',
            height : 1.2,
            types :['grass', 'water']
        },
    
       {
           name : 'Macgoke',
           height : 1.5,
           types : ['grass', 'fire']
       },
    
       {
           name : 'Golduck',
           height : 1.7,
           types : ['grass', 'poison']
       }
    
    ];
        function add(pokemon) {
            repository.push(pokemon);
        }

        function getAll() {
            return repository;
        }

        return {
            add: add,
            getAll: getAll
        };
    
})();
console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(currentPokemon){
    document.write('<h2 style="color:skyblue">' + currentPokemon.name + ' ' + currentPokemon.height + '</h2>');
  document.write(currentPokemon.types);

});








 