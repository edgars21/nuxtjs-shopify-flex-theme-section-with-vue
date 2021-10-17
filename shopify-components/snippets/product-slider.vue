<template>
  <div :class="'slider-gallery' + ' ' +
    ((templateVariables['show_gutter'] == false) ? 'has-no-side-gutter' : '' ) + ' ' +
    'products-slider products-length-' + templateVariables['products_length'] + ' ' +
    'transparentBackground--' + templateVariables['settings'].slideshow_button_style"
    :data-products-per-slide="templateVariables['visible_products']"
    :data-products-limit="templateVariables['limit']"
    :data-products-available="templateVariables['products_length']">

    <div v-for="product in templateVariables.products" :key="product.id" :class="'gallery-cell thumbnail visible-' + templateVariables['visible_products'] + ' ' +
      RenderCall.ColumnWidth(templateVariables['per_slide']) + ' ' +   
      'medium-down--one-half column has-thumbnail-sticker' + ' ' +
      ((product.images[1] && templateVariables['settings'].show_secondary_image == true) ? 'has-secondary-image-swap' : '')">
      <div class="product-wrap">
        <div class="product-image__wrapper">
          <div class="image__container product__imageContainer">
            <a :href="product.onlineStoreUrl">
              <SnippetProductThumbnailSticker v-if="templateVariables['settings'].stickers_enabled"
                :theme-object="themeObject"
                :render-variables="{
                      product: product,
                      context: 'product',
                      collection_handles: templateVariables['collection_handles']   
                }">
              </SnippetProductThumbnailSticker>
              <SnippetImageElement
                :theme-object="themeObject"
                :render-variables="{
                      image: product.images[0],
                      alt: templateVariables['alt_text'],
                      object_fit: templateVariables['align_height'],
                      max_height: templateVariables['height'],
                      lazyload: true
                }">
              </SnippetImageElement> 
            </a>
          </div>
        </div>
        <div :class="'thumbnail__caption text-align-' + templateVariables['settings'].thumbnail_text_alignment">
          <ProductThumbnailProductInfo
            :theme-object="themeObject"
            :render-variables="{
                  product: product,
                  collection_handles: templateVariables['collection_handles'],
            }">
          </ProductThumbnailProductInfo>
        </div>
      </div>
    </div>      
  </div>  
</template>


<script>
import jsFeaturedCollection from '../js/z__jsFeaturedCollection';
import RenderCall__ColumnWidth from '../render-call/column-width';
import SnippetProductThumbnailSticker from '../snippets/product-thumbnail__sticker.vue';
import SnippetImageElement from '../snippets/image-element.vue';
import ProductThumbnailProductInfo from '../snippets/product-thumbnail__product-info.vue';

export default {
  components: {
    SnippetProductThumbnailSticker,
    SnippetImageElement,
    ProductThumbnailProductInfo,
  },

  data() {
    return {
      RenderCall: {
        ColumnWidth: RenderCall__ColumnWidth,
      },       
      templateVariables: {},
    }  
  },

  props: [
    "themeObject",
    "renderVariables",
  ],

  methods: {
    parseTemplateVariables() {
      this.templateVariables['settings'] = this.themeObject.settings;
      this.templateVariables['template'] = this.themeObject.template;
      
      for (const renderVar in this.renderVariables) {
        this.templateVariables[renderVar] = this.renderVariables[renderVar];
      }          
    },

    initCurrentScopeTemplateVariables() {
      this.templateVariables['collection_handles'] = 'not in storefront data';

      if (this.templateVariables['related_products']) {
        true;
      } else {
        this.templateVariables['hover_enabled'] = this.templateVariables['settings'].thumbnail_hover_enabled;
        this.templateVariables['loop_limit'] = this.templateVariables['limit'];
      }

      if (this.templateVariables['per_slide']) {
        this.templateVariables['visible_products'] = this.templateVariables['per_slide'];
      } else {
        this.templateVariables['visible_products'] = this.templateVariables['products_per'];
      }

      if (this.templateVariables['template'].includes('product')) {
          if (this.templateVariables['limit'] <= this.templateVariables['visible_products']) {
            this.templateVariables['products_length'] = this.templateVariables['limit'];
          } else {
            this.templateVariables['products_length'] = this.templateVariables['products'].length;
          }
      } else if (this.templateVariables['featured_collection']) {
        true;
      } else if (this.templateVariables['section'].settings.show_product_recommendation) {        
        this.templateVariables['products_length'] = this.templateVariables['limit'];        
      } else {
        this.templateVariables['products_length'] = this.templateVariables['products'].length;
      }

      if (this.templateVariables['product_recommendations'] == true) {
        this.templateVariables['hover_enabled'] = this.templateVariables['settings'].thumbnail_hover_enabled; 
      }      

      if (this.templateVariables['skip_product']) {
        this.templateVariables['products'] = this.templateVariables['products'].filter(product => !(this.templateVariables['skip_product'] == product.id));
      }

      if (this.templateVariables['loop_limit']) {
        this.templateVariables['products'] = this.templateVariables['products'].slice(0, this.templateVariables['loop_limit']);
      }      
    },

    initSLider() {
      const sectionData = {
        "collection_style": this.templateVariables['layout'],
        "products_per": this.templateVariables['per_slide'],
        "products_available": this.templateVariables['products'].length,
        "products_limit": this.templateVariables['limit'],
        "align_height": this.templateVariables['align_height'],
      }

      if (process.client) {
        jsFeaturedCollection.init(sectionData);
      }
    }
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
    this.initSLider();
  },

  mounted: function () {
    this.$nextTick(function () {
      this.initSLider();
    })
  }  
}
</script>


<style lang="css">
 .slider-gallery {
    width: 100%;
 }
 .image-element__wrap {
   position: relative;
 }

 .image-element__wrap::before {
    content: "";
    display: block;
    padding-top: 100%;   
 }

 .image-element__wrap img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
 } 
</style>