function memo() {
  const submit = document.getElementById("submit");//document.getElementById("id名")はDOMツリーから特定のHTMLの要素を取得するためのメソッドの1つです。引数に渡したidを持つ要素を取得します。
  submit.addEventListener("click", (e) => {//クリックしたら何かが起きる
    const formData = new FormData(document.getElementById("form"));//FormDataについてはhttps://master.tech-camp.in/curriculums/4654参照
    const XHR = new XMLHttpRequest();//非同期通信のためのXMLHttpRequestオブジェクトを生成する
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };

    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo);