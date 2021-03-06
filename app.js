document.getElementById('search').addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
      document.getElementById('search-btn').click()
    }
})


document.getElementById('duration').addEventListener('keypress', function(event){
  if(event.key == 'Enter'){
    document.getElementById('create-slider').click()
  }
})


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

let sliders = [];



const KEY = '15674931-a9d714b6e9d654524df198e00&q';


const showImages = (images) => {
  toggleSpinner(false);
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  
  galleryHeader.style.display = 'flex';
  images.forEach(images => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail all-images" onclick=selectItem(event,"${images.webformatURL}") src="${images.webformatURL}" alt="${images.tags}">`;
    gallery.appendChild(div)
  })
 
}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(error => console.log(error))
    toggleSpinner(true)
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
   // console.log("item",  sliders.);
  }
  else{
    element.classList.remove('added');
    sliders.splice(sliders.indexOf(img), 1);
  }
}
var timer
const createSlider = () => {
 
  
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  if (document.getElementById('duration').value < 0) {
    alert("Duration time can't be negative! please input valid time!!")
    return;
  }  
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
 
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';

  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;


    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
  
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
  
}

 
const changeItem = index => {

  changeSlide(slideIndex += index);
}


const changeSlide = (index) => {
  
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"

}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})




const toggleSpinner = (show) => {
  const spinner = document.getElementById('loading-spinner');
  if(show){
      spinner.classList.remove('d-none');
  }
  else{
      spinner.classList.add('d-none');
  }

}