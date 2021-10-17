<template>
  <div style="text-align:center;">
    <br>
    <h2>Index page</h2>
    <br>
    <div>-------------------------------------------</div>
    <h1>nuxtjs@shopify-flex-theme-section-with-vue</h1>
    <div>-------------------------------------------</div>
    <br>
    <br>
    <br>
    <IndexFeaturedCollection :theme-object="themeObject"></IndexFeaturedCollection>
  </div>
</template>

<script>
import IndexFeaturedCollection from '../sections/index__featured-collection.vue';

const themeObject = {
  "settings": {
        "heading_divider_style": "short",
        "display_heading_divider": true,
        "thumbnail_hover_enabled": false,
        "image_crop": false,
        "regular_color": "red",
        "enable_quickshop": false,
        "stickers_enabled": true,
        "show_secondary_image": true,
        "sticker_shape": "round",
        "sticker_position": "top-left",
        "image_loading_style": "blur-up",
        "thumbnail_text_alignment": "left",
        "display_vendor": true,
        "currency_format": "default",
        "slideshow_button_style": "default",
  },
  template: 'product',
  translations: {
    collections: {
      general: {
        best_seller: "Best Seller",
        coming_soon: "Coming Soon",
        new: "New",
        pre_order: "Pre Order",
        sale: "Sale",
        staff_pick: "Staff Pick",
      }
    }
  }
}

export default {
    components: {
      IndexFeaturedCollection
    },

    data() {
        return {
           themeObject: themeObject
        }
    },
}
</script>