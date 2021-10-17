let jsFeaturedCollection = {};

if (process.client) {
const Flickity = require('flickity');

jsFeaturedCollection = {
  init: function init(sectionData) {
    if (sectionData) {
        for (const sectionVar in sectionData) {
            this[sectionVar] = sectionData[sectionVar];
        }        
    }
    this.createSlider()
  },
  createSlider: function createSlider() {
    var featuredCollectionSlider = document.querySelector('.featured-collection.layout--slider .slider-gallery');
    
    var slideData = {
      products_per_slide: this.products_per,
      products_available: this.products_available,
      products_limit: this.products_limit,
      cellAlign: "left",
      wrapAround: true
    };
    if (!featuredCollectionSlider) return;
    new Flickity(featuredCollectionSlider, {
      lazyLoad: 2,
      freeScroll: true,
      imagesLoaded: true,
      draggable: true,
      cellAlign: 'center',
      wrapAround: slideData.wrapAround,
      pageDots: false,
      contain: true,
      prevNextButtons: slideData.products_limit > slideData.products_per_slide ? true : false,
      initialIndex: 0,
      on: {
        ready: function () {
          this.on('settle', () => {
            this.resize();
          });
        } 
      }
    });
  }
};
}

export default jsFeaturedCollection;