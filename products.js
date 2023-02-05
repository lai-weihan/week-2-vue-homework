// 產品資料格式
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    //1.資料集
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'wh2030',
      tempProduct: {},
      products: [],
    };
  },
  //2.方法集
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;

      axios
        .get(url)
        .then((response) => {
          // 把回傳的products放到資料data的products
          this.products = response.data.products;
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    openProduct() {},
  },
  //3.生命週期
  mounted() {
    //取得名為hexToken的cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //token夾帶到headers裡
    axios.defaults.headers.common['Authorization'] = token;
    //執行確認是否登入
    this.checkAdmin();
  },
};

createApp(app).mount('#app');
