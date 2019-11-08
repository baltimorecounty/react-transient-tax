import * as constantItems from "./Constants";
import _ from "lodash";

export const returnConstantItems = (constantItemName, item) => {
  var constantItem = "";

  constantItem = _.filter(constantItems[constantItemName], { key: item });
  return constantItem[0].value;
};
