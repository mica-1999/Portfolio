document.getElementById('expand-sidebar').addEventListener('click', function() {
  const expand = document.getElementById('sidebar');
  expand.classList.add("z-2");
  expand.classList.remove("responsive-action");
  document.getElementsByClassName("fa-arrow-left")[0].classList.remove("d-none");    
});

document.getElementsByClassName("fa-arrow-left")[0].addEventListener('click', function() {
  const expand = document.getElementById('sidebar');
  expand.classList.remove("z-2");
  expand.classList.add("responsive-action");
  document.getElementsByClassName("fa-arrow-left")[0].classList.add("d-none");
});
