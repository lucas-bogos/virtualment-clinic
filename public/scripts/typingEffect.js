function typeWrite(element){
  const textoArray = element.innerHTML.split('');
  element.innerHTML = ' ';
  textoArray.forEach(function(caract, i){   
    
  setTimeout(function(){
      element.innerHTML += caract;
  }, 100 * i)

});
}
const titulo = document.querySelector('.billhead__header__title');
typeWrite(titulo);
