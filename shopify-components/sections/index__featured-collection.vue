<template>
    <section v-if="loaded" class="section" :class='templateVariables.object.settings.css_class + " is-width-" + templateVariables.object.settings.width + " has-gutter-enabled"'>
        <div class="container" v-if="templateVariables.title">
            <SnippetHeading 
                :theme-object="themeObject"
                :render-variables="{
                    title: templateVariables.title,
                    heading_tag: 'h2',
                    context: 'featured-collection',
                    text_alignment: 'center',
                    url: templateVariables.collection.url,
                }"
            >    
            </SnippetHeading>
        </div>
        <div :class="'container has-column-padding-bottom featured-collection' + ' layout--' + templateVariables.layout + ' is-justify-center'">
            <SnippetProductSlider v-if="templateVariables.layout == 'slider'"
                :theme-object="themeObject"
                :render-variables="{
                limit: templateVariables.object.settings.products_limit,
                products: templateVariables.collection.products,
                skip_product: null,
                per_slide: templateVariables.object.settings.products_per,
                mobile_products_per_row: templateVariables.object.settings.mobile_products_per_row,
                align_height: templateVariables.object.settings.align_height,
                height: templateVariables.object.settings.height,
                show_gutter: templateVariables.object.settings.show_gutter,
                featured_collection: templateVariables.collection,
                layout: templateVariables.layout,
                }"
            ></SnippetProductSlider>
            <template v-else>
                <SnippetProductLoop v-for="product in templateVariables.collection.products" :key="product.id"
                    :theme-object="themeObject"
                    :render-variables="{
                        limit: templateVariables.object.settings.products_limit,
                        products: templateVariables.collection.products,
                        skip_product: '',
                        products_per_row: templateVariables.object.settings.products_per,
                        mobile_products_per_row: templateVariables.object.settings.mobile_products_per_row,
                        align_height: templateVariables.object.settings.align_height,
                        height: templateVariables.object.settings.height,        
                    }"
                ></SnippetProductLoop>
            </template>
        </div>            
    </section>
</template>


<script>
import base64 from 'base-64';
import SnippetHeading from '../snippets/heading.vue';
import SnippetProductSlider from '../snippets/product-slider.vue';
import SnippetProductLoop from '../snippets/product-loop.vue';


const sectionObject = {
  "name": "Featured collection",
  "class": "featured-collection-section jsFeaturedCollection",
  "settings": {
        "title": "Custom section title here",
        "collection": "274461098165",
        "products_per": 5,
        "mobile_products_per_row": 1,
        "products_limit": 10,
        "align_height": false,
        "collection_height": 200,
        "collection_style": "slider",
        "width": "standard",
        "show_gutter": true,
        "padding_top": 20,
        "padding_bottom": 20,
        "animation": "none",
        "css_class": '',
        "custom_css": '',
  }
}


export default {
    components: {
        SnippetHeading,
        SnippetProductSlider,
        SnippetProductLoop,
    },

    data() {
        return {
            loaded: false,
            templateVariables: {},
        }
    },

    props: [
        "themeObject"
    ],

    methods: {
        parseTemplateVariables() {
            this.templateVariables['settings'] = this.themeObject.settings;
            this.templateVariables['section'] = sectionObject
        },

        initCurrentScopeTemplateVariables() {
            this.templateVariables['collection'] = this.templateVariables['section'].settings.collection_style;
            this.templateVariables['object'] = this.templateVariables['section'];
            this.templateVariables['title'] = this.templateVariables['section'].settings.title;
            this.templateVariables['layout'] = this.templateVariables['section'].settings.collection_style;
        },

        async fetchCollction(collection) {
            const collection_name = "gid://shopify/Collection/" + collection;
            const collection_id = base64.encode(collection_name);
            let result = await this.$shopify.collection.fetchWithProducts(collection_id, {productsFirst: 20});
            result = JSON.parse(JSON.stringify(result));
            return result;
        }
    },

    async fetch() {
        this.parseTemplateVariables();
        this.initCurrentScopeTemplateVariables();
        let result = await this.fetchCollction(this.templateVariables['section'].settings.collection);
        this.templateVariables['collection'] = result;
        this.loaded = true;
    },    
}
</script>