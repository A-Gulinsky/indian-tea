
// experts
const experts = document.querySelector('.experts__user-list');
const expertsLi = document.querySelectorAll('.experts__user-item');
const expertsBox = document.querySelectorAll('.experts__user-box');

// experts - data
const expertsData = [
  {
    author: 'Timothy Sheldon',
    role: 'Experts',
    title: '“Lorem ipsum dolor sit amet!”',
    comment:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span class="experts__description-span">Praesent nec sapien</span> eu ipsum semper fermentum.</p>',
  },
  {
    author: 'Rosa Sheldon',
    role: 'Experts',
    title: '“Cumque eaque neque!”',
    comment:
      '<p>Voluptatibus porro id ea ducimus eligendi sint consectetur, dolore assumenda quos provident magni nam</p>',
  },
  {
    author: 'Michael Keldon',
    role: 'Experts',
    title: '“Nam tenetur mollitia et!”',
    comment:
      '<p>Doloremque quam hic, quasi,sapiente aliquam ullam nemo quae veniam incidunt pariatur</p>',
  },
  {
    author: 'Anna Sheldon',
    role: 'Experts',
    title: '“Lorem ipsum dolor sit amet!”',
    comment: '<p>Quidem praesentium eveniet a magni.</p>',
  },
];

// experts - template
function descriptionTemplate(expertsData, currentIdx) {
  return `
    <div class='experts__bottom-side'>
      <ul class='experts__author-list'>
        <li class='experts__author-item'>
          <p class='experts__author-name'>${expertsData[currentIdx].author}</p>
        </li>
        <li>
          <p class='experts__author-role'>${expertsData[currentIdx].role}</p>
        </li>
      </ul>

      <ul class='experts__description-list'>
        <li class='experts__description-item'>
          <img class='experts__description-stars' src='./assets/stars.svg' />
        </li>
        <li class='experts__description-item'>
          <h3 class='experts__description-title'>${expertsData[currentIdx].title}</h3>
        </li>
        <li class='experts__description-comment'>
          ${expertsData[currentIdx].comment}
        </li>
      </ul>
    </div>
  `;
}

let activeId = 1;

// experts - Progress bar
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('class', 'progress-ring');
svg.setAttribute('width', '90');
svg.setAttribute('height', '90');

const svgCircle = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'circle'
);
svgCircle.setAttribute('class', 'progress-ring__circle');
svgCircle.setAttribute('cx', '45');
svgCircle.setAttribute('cy', '45');
svgCircle.setAttribute('r', '40');
svgCircle.style.strokeWidth = '2px';
svgCircle.style.stroke = '#009efe';

const circle = svgCircle;
const r = circle.r.baseVal.value;
const circumference = 2 * Math.PI * r;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

svg.appendChild(svgCircle);

// progress bar - func
function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// progress bar - animate progress bar + callback
function animateProgress(duration, callback) {
  let currentTime = 0;
  const interval = 50; // каждые 50 миллисекунд

  const totalFrames = duration / interval;
  const increment = 100 / totalFrames;

  const progressInterval = setInterval(() => {
    currentTime += interval;
    if (currentTime <= duration) {
      setProgress((currentTime / duration) * 100);
    } else {
      currentTime = 0;
      if (callback) {
        currentTime = 0;
        callback();
      }
    }
  }, interval);
}

// experts - get user comment list/item
const expertsListItems = document.querySelector('.experts__user-comment-list');
const expertLi = document.createElement('li');

// experts - set currentUser progress bar/comment
function setCurrentUser() {
  let currentIdx = 0;

  expertLi.innerHTML = descriptionTemplate(expertsData, currentIdx);

  // push progress bar for first user
  expertsListItems.appendChild(expertLi);
  expertsBox[currentIdx].appendChild(svg);

  animateProgress(5000, () => {
    // next user
    currentIdx++;
    // if idx = 4 , return 0
    currentIdx %= 4;

    // 126 string if (currentTime <= duration)
    // this setTimeout to avoid possible additional 50 milliseconds
    setTimeout(() => {
      expertsBox[currentIdx].appendChild(svg);
    }, 50);

    expertLi.innerHTML = '';
    expertLi.innerHTML = descriptionTemplate(expertsData, currentIdx);
    expertsListItems.appendChild(expertLi);
  });
}

setCurrentUser();

// Slider

// Slider - slider settings
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: '26px',
  slidesPerView: 'auto',
  speed: 1500,
  breakpoints: {
    1200: {
      spaceBetween: 24,
    },
  },
});

// Slider - work with active/not active slide
const activeSlide = document.querySelector('.swiper-slide-active');
const slides = Array.from(document.querySelectorAll('.swiper-slide'));

let activeSlideIndex = 0;

// Slider - when slide changed, toggle class active/not-active
swiper.on('slideChange', function () {
  let currentIdx = activeSlideIndex;
  activeSlideIndex = swiper.realIndex;

  if (currentIdx === activeSlideIndex) {
    return;
  }

  slides[currentIdx].classList.replace('active-slide', 'not-active-slide');
  slides[activeSlideIndex].classList.replace(
    'not-active-slide',
    'active-slide'
  );
  currentIdx = activeSlideIndex;
});

// Slider video
const videoBox = document.querySelector('.swiper-wrapper');

// Slider video - if video is finished, get play-btn
function checkIsVideoEnd(video, playButton) {
  video.addEventListener('ended', () => {
    playButton.style.display = 'block';
  });
}

// Slider video - play/stop video
videoBox.addEventListener(`click`, (e) => {

  const swiperSlide = e.target.classList.contains('swiper-slide');

  if (!swiperSlide) {
    return
  }

  const box = e.target.querySelector('.video__box')
  const video = box.children[0].querySelector('.video')
  const playButton = e.target.querySelector('.video-button')

  checkIsVideoEnd(video, playButton);

  if (video.paused) {
    playButton.style.display = 'none'
    return video.play()
  }
  
  video.pause()
  playButton.style.display = 'block'
});
