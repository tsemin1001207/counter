// Firebase 模組
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, set, update, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// 你的 Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyA6Lm6Flx878p6GReuF8u3AX2xBypYKd2k",
  authDomain: "counter-7df4e.firebaseapp.com",
  databaseURL: "https://counter-7df4e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "counter-7df4e",
  storageBucket: "counter-7df4e.firebasestorage.app",
  messagingSenderId: "175857896264",
  appId: "1:175857896264:web:4993068673eccb9b74017d"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 四個項目名稱
const items = ["套圈圈", "丟棒球", "飲料A", "飲料B"];

// 初始化監聽資料
items.forEach(item => {
  const itemRef = ref(db, `counters/${item}`);
  onValue(itemRef, (snapshot) => {
    const val = snapshot.val() ?? 0;
    document.getElementById(item).innerText = val;
  });
});

// 增加或減少次數
window.changeCount = function(item, delta) {
  const itemRef = ref(db, `counters/${item}`);
  get(itemRef).then(snapshot => {
    let count = snapshot.val() ?? 0;
    count += delta;
    if (count < 0) count = 0;
    set(itemRef, count);
  });
}

// 全部歸零
window.resetAll = function() {
  const updates = {};
  items.forEach(item => updates[`counters/${item}`] = 0);
  update(ref(db), updates);
};
