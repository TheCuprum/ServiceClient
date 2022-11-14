import {checkToken} from "./util";

namespace index {
    // console.log("Hello World!");
    checkToken(window, () => {window.location.href = "order_list.html"});
}