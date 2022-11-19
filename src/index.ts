import { ORDER_PAGE } from "./config";
import {checkToken} from "./util";

namespace index {
    // console.log("Hello World!");
    checkToken(window, () => {window.location.href = ORDER_PAGE});
}