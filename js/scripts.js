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


repository.forEach(function(currentPokemon){
    document.write('<h2 style="color:skyblue">' + currentPokemon.name + '</h2>');
  document.write(currentPokemon.name + ' ' + currentPokemon.height);

});








 