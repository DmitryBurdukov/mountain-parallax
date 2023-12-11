const parallax = document.querySelector('.parallax')
      human = document.querySelector('.parallax__gras'),
      mountains = document.querySelector('.parallax__mountains'),
      started = document.querySelector('.started'),
      scrollDownButton = document.querySelector('.parallax__scroll'),
      links = document.querySelectorAll('.links__item'),
      blocks = document.querySelectorAll('[data-link]'),
      logoLink = document.querySelectorAll('.header__logo');

parallax.addEventListener('mousemove', (e) => {
    const centerX = parallax.offsetWidth / 2,
          centerY = parallax.offsetHeight / 2,
          humankoeff = 35,
          mountainCoeff = 80,
          leftOffset = ((e.clientY - centerY) / humankoeff).toFixed(2),
          topOffset = ((e.clientX - centerX) / humankoeff).toFixed(2);

      moveItem(human, topOffset, leftOffset, humankoeff);
      moveItem(mountains, topOffset, leftOffset, mountainCoeff)
})

document.addEventListener('scroll', (e) => {
      moveItemByScroll(e, mountains, 10);
      moveItemByScroll(e, human, -40);
})

function moveItem(elem, posX, posY, koef) {
      elem.style.cssText = `transform: translateX(${posX / koef}%)
                            translateY(${posY / koef * 20}px)` ;
}

function moveItemByScroll(e, elem, scrollKoeff) {
      const scroll = window.scrollY;
      if (scroll && scroll < parallax.offsetHeight) {
            elem.style.marginTop = `${scroll.toFixed(0) / scrollKoeff}px`;
      }
}

const bottomPositionPX = document.body.clientHeight - document.documentElement.clientHeight;

function scrollToPosition(elem, offset = 0) {
      const positionTo = elem.getBoundingClientRect().top + scrollY + offset;
      window.scrollTo({
            top: positionTo,
            left: 0,
            behavior: 'smooth'
      });
}

scrollDownButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToPosition(blocks[4]);
      removeClass(links);
})

links.forEach((element, i) => {
      element.addEventListener('click', (e) => {
            if (e.target.classList.contains('lnk') || e.target.classList.contains('links__item')) {
                  removeClass(links);
                  // setTimeout(() => {
                  //       element.classList.add('links__item_active');
                  // },0);
                  
                  if (i === 0) {
                        scrollToPosition(blocks[i]);
                  } else {
                        scrollToPosition(blocks[i], 230);
                  }

            }
      });
});

function removeClass(elementArray) {
      elementArray.forEach(item => {
            item.classList.remove('links__item_active');
      });
}

logoLink.forEach(item => {
      item.addEventListener('click', () => {
            console.log('logo')
            scrollToPosition(blocks[0], 0);
      })
})
let scrollData = [];
function fillDataArray(offset = 0) {

      links.forEach((link, i) => {
            scrollData.push(blocks[i].getBoundingClientRect().top + scrollY + offset)
      });
      console.log(scrollData);
}

window.addEventListener('scroll', () => {
      scrollData.forEach((item, i) => {
            if (scrollY >= item && scrollY <= scrollData[i + 1]) {
                  removeClass(links);
                  links[i].classList.add('links__item_active');
            }
            if (scrollY > scrollData[scrollData.length - 1]) {
                  removeClass(links);
                  links[3].classList.add('links__item_active');
            };
      })

})

fillDataArray();