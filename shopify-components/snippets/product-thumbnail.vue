<template>
  <div :class="
    RenderCall.ColumnWidth(templateVariables['products_per_row']) + ' ' +
    'medium-down--one-half' + ' ' +
    ((templateVariables['mobile_products_per_row'] == '1') ? 'small-down--one-whole' : 'small-down--one-half') + ' ' +
    'column' + ' ' +
    ((templateVariables['settings'].enable_quickshop) ? 'quick-shop--true' + ' ' + 'quick-shop--closed' + ' ' + 'product-' + templateVariables['product'].id + ' js-product_section' : '') + ' ' +
    ((templateVariables['settings'].stickers_enabled) ? 'has-thumbnail-sticker' : '') + ' ' +
    ((templateVariables['product'].images[1] && templateVariables['settings'].show_secondary_image) ? 'has-secondary-image-swap' : '') + ' ' +
    'thumbnail' + ' ' +
    'product__thumbnail' + ' ' +
    'product__grid-item' + ' ' +
    'thumbnail__hover-overlay--' + templateVariables['hover_enabled'] + ' ' +
    'has-padding-bottom'    
  ">
    <div class="product-wrap">
      <div class="product-image__wrapper">
        <div class="image__container product__imageContainer">
          <a :href="templateVariables['product'].onlineStoreUrl">
            <SnippetProductThumbnailSticker v-if="templateVariables['settings'].stickers_enabled"
              :theme-object="themeObject"
              :render-variables="{
                    product: templateVariables['product'],
                    context: 'product',
                    collection_handles: templateVariables['collection_handles']   
              }">
            </SnippetProductThumbnailSticker>
            <SnippetImageElement
              :theme-object="themeObject"
              :render-variables="{
                    image: templateVariables['product'].images[0],
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
                product: templateVariables['product'],
                collection_handles: templateVariables['collection_handles'],
          }">
        </ProductThumbnailProductInfo>
      </div>
    </div>
    <div v-if="templateVariables['settings'].align_height == true">
      <component :is="'style'">
        .product-{{ templateVariables['product'].id }} .image__container img,
        .product-{{ templateVariables['product'].id }} .product-thumbnail__video .plyr {
          max-width: 100%;
          width: {{ templateVariables['height'] }}px;
          margin: 0 auto;
        }
        .shopify-model-viewer-ui model-viewer {
          --progress-bar-height: 2px;
          --progress-bar-color: {{ templateVariables['settings'].regular_color }};
        }
      </component>    
    </div>    
  </div>      
</template>


<script>
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
      
      for (const renderVar in this.renderVariables) {
        this.templateVariables[renderVar] = this.renderVariables[renderVar];
      }          
    },

    initCurrentScopeTemplateVariables() {
      this.templateVariables['hover_enabled'] = this.templateVariables['settings'].thumbnail_hover_enabled;
      this.templateVariables['object'] = this.templateVariables['section'];
      this.templateVariables['secondaryImage'] = this.templateVariables['product'].images[1];
      this.templateVariables['collection_handles'] = 'not in storefront data';
      
      if (typeof this.templateVariables['product'].images[0].altText == "string" && this.templateVariables['product'].images[0].altText.includes('youtube')) {
        this.templateVariables['alt_text'] = this.templateVariables['product'].title;
      } else {
        this.templateVariables['alt_text'] = this.templateVariables['product'].images[0].altText;
      }

      this.templateVariables['image_crop'] = this.templateVariables['settings'].image_crop;
    }  
  },

  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>