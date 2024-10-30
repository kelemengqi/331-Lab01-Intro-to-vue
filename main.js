// main.js
const { createApp, ref, computed } = Vue;

const app = createApp({
    setup() {
        const cart = ref([]); // 购物车现在是一个数组
        const premium = ref(true);

        function updateCart(id) {
            cart.value.push(id); // 将产品 ID 添加到购物车
        }

        function removeFromCart(id) {
            const index = cart.value.indexOf(id);
            if (index > -1) {
                cart.value.splice(index, 1); // 从购物车中移除产品 ID
            }
        }

        function clearCart() {
            cart.value = []; // 清空购物车
        }

        const uniqueCart = computed(() => [...new Set(cart.value)]); // 获取唯一产品 ID

        function countInCart(id) {
            return cart.value.filter((item) => item === id).length; // 统计每种产品数量
        }

        return {
            cart,
            premium,
            updateCart,
            removeFromCart,
            clearCart, // 暴露清空购物车的方法
            uniqueCart,
            countInCart,
        };
    },
});

// 组件注册
app.component('product-display', {
    ...productDisplay,
    methods: {
        clearCart() {
            this.clearCart(); // 调用清空购物车的方法
        },
    },
});
app.component('review-form', reviewForm);
app.component('review-list', reviewList);
app.mount('#app');
