<template>
    <SnippetProductThumbnail
      :theme-object="themeObject"
      :render-variables="{
        products: templateVariables.products,
        limit: templateVariables.limit,
        products_per_row: templateVariables.products_per_row,
        mobile_products_per_row: templateVariables.mobile_products_per_row,
        align_height: templateVariables.align_height,
        height: templateVariables.height,
        collection_group_thumb: templateVariables.collection_group_thumb,
        collection_group_mobile: templateVariables.collection_group_mobile,
        related_products: templateVariables.related_items        
      }"
    >
    </SnippetProductThumbnail>
</template>


<script>
import SnippetProductThumbnail from '../snippets/product-thumbnail.vue';

export default {
  components: {
    SnippetProductThumbnail
  },

  data() {
    return {
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
      if (!this.templateVariables['related_products']) {
        this.templateVariables['hover_enabled'] = "";
        this.templateVariables['related_items'] = true;
      } else {
        this.templateVariables['hover_enabled'] = this.templateVariables['settings'].thumbnail_hover_enabled;
        this.templateVariables['related_items'] = true;
      }

      if (this.templateVariables['skip_product']) {
        this.templateVariables['products'] = this.templateVariables['products'].filter(product => !(this.templateVariables['skip_product'] == product.id));
      }

      this.templateVariables['products'] = this.templateVariables['products'].slice(0, this.templateVariables['limit']);
    },
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>