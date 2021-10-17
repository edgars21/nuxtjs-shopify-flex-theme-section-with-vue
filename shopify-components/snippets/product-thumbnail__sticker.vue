<template>
    <div v-if="templateVariables['show_stickers']" :class="
      'sticker-holder' + ' ' +
      'sticker-shape-' + templateVariables['settings'].sticker_shape + ' ' +
      'sticker-position-' +  templateVariables['settings'].sticker_position">
      <div :class="'sticker-holder__content sticker-holder__content--' + templateVariables['context']">
        <div v-if="templateVariables['collection_handles'].includes('best-seller')" :class="'best-seller-sticker thumbnail-sticker sticker-' + templateVariables['i']">
          <span class="sticker-text">{{ templateVariables['translations'].collections.general.best_seller }}</span>
        </div>

        <div v-if="templateVariables['collection_handles'].includes('coming-soon')" :class="'coming-soon-sticker thumbnail-sticker sticker-' + templateVariables['i']">
          <span class="sticker-text">{{ templateVariables['translations'].collections.general.coming_soon }}</span>
        </div>

        <div v-if="templateVariables['collection_handles'].includes('new')" :class="'new-stickerthumbnail-sticker sticker-' + templateVariables['i']">
          <span class="sticker-text">{{ templateVariables['translations'].collections.general.new }}</span>
        </div>

        <div v-if="templateVariables['collection_handles'].includes('new')" :class="'pre-order-sticker thumbnail-sticker sticker-' + templateVariables['i']">
          <span class="sticker-text">{{ templateVariables['translations'].collections.general.pre_order }}</span>
        </div>

        <div v-if="templateVariables['product'].available && templateVariables['product'].compare_at_price > templateVariables['product'].price" :class="'sale-sticker thumbnail-sticker sticker-' + templateVariables['i']">
          <span class="sticker-text">{{ templateVariables['translations'].collections.general.sale }}</span>
        </div>

        <div v-if="templateVariables['collection_handles'].includes('new')" :class="'staff-pick-sticker thumbnail-sticker sticker-' + templateVariables['i']">
            <span class="sticker-text">{{ templateVariables['translations'].collections.general.staff_pick }}</span>
        </div>
      </div>
    </div>
</template>


<script>
export default {
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
      if (this.templateVariables['product'].available && this.templateVariables['product'].compare_at_price_max > this.templateVariables['product'].price ) {
        this.templateVariables['product_on_sale'] = true;
      }

      if (this.templateVariables['collection_handles'].includes('best-seller') || this.templateVariables['collection_handles'].includes('coming-soon') || this.templateVariables['collection_handles'].includes('new') || this.templateVariables['collection_handles'].includes('pre-order') || this.templateVariables['collection_handles'].includes('staff-pick') || this.templateVariables['product_on_sales']) {
        this.templateVariables['show_stickers'] = true;
      }    
    },
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>