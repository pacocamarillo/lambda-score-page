import { event } from "./event";
import { pageCopy, siteSettings } from "./pageCopy";
import { post } from "./post";
import { rentalItem } from "./rentalItem";
import { resultObjects, resultSet } from "./resultSet";

export const schemaTypes = [
  post,
  event,
  rentalItem,
  resultSet,
  ...resultObjects,
  pageCopy,
  siteSettings,
];
