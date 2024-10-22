const { createApp, ref, computed } = Vue;

const app = createApp({
    setup(props) { // 添加 props 参数
        const cart = ref(0);
        const premium = ref(true);

        const brand = ref('VueMastery');

        // 计算运费
        const shipping = computed(() => {
            return premium.value ? 'Free' : 30; // 使用 premium.value 代替 props.premium
        });

        const product = ref('Boots'); // 产品名称
        const description = ref('SE 331 '); // 产品描述

        const inventory = ref(100); // 总库存数量
        const onSale = ref(true); // 是否促销

        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ]);

        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ]);

        const selectedVariant = ref(0); // 当前选择的变体索引

        // 计算属性：根据选择的变体更新图片路径
        const image = computed(() => variants.value[selectedVariant.value].image);

        // 计算属性：检查当前选择的变体是否有库存
        const inStock = computed(() => variants.value[selectedVariant.value].quantity > 0);

        // 添加到购物车的函数
        function addToCart() {
            if (inStock.value) {
                cart.value += 1;
            }
        }

        // 更新选择的变体
        function updateVariant(index) {
            selectedVariant.value = index;
        }

        // 计算标题：品牌 + 产品名称
        const title = computed(() => brand.value + ' ' + product.value);

        return {
            title,
            description,
            image,
            inStock,
            inventory,
            onSale,
            details,
            variants,
            cart,
            premium,
            shipping,
            addToCart,
            updateVariant
        };
    }
});

app.component('product-display', productDisplay);
app.mount('#app');
