var hoverheader = document.querySelector('#hover')

hoverheader.addEventListener('mouseover',function(){
    hoverheader.textContent = "Have A Bite";
    
})
hoverheader.addEventListener('mouseout',function(){
    hoverheader.textContent = "Meals";
   
})
