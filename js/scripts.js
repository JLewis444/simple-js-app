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

]



for (var i = 0; i < repository.length; i++) {
   console.log(repository[i]);
    if (repository[i].height > 1.5) {
      document.write ('<p class="top_article">WELL - this is biggest Pokemon</p>');
    }
    
    document.write('<h2><a href="">' + repository[i].name,  repository[i].height,'</a></h2>');

     document.write ('<p class="small"> Types : ');
    for (var j = 0; j < repository[i].types.length; j++) {
         repository[i].types[j]
         document.write('<span class="small" style="color:blue">' + repository[i].types[j] + ',');     }
       if (repository[i] == 'Poison') {
        document.write (' <span class="small" style="color:purple">' + repository[i].types[j] + ',');
       }
       else if (repository[i] == 'Fire') {
         document.write (' <span class="small" style="color:red">' + repository[i].types[j] + ',');
       }
       else (repository[i] == 'Water'); {
         document.write (' <span class="small" style="color:skyblue">' + repository[i].types[j] + ',');
       }
   
 } 