import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 1. 建立元件
const app = {
  data() {
    return {
      // a.登入資料
      user: {
        username: '',
        password: '',
      },
    };
  },
  // b.方法集
  methods: {
    login() {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },

  mounted() {
    console.log('vue初始化!');
    console.log(this.login);
  },
};
// 生成vue // 渲染在#app
createApp(app).mount('#app');
