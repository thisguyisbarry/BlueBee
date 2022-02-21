import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  const storageStack = new StorageStack(app, "storage");

  const apiStack = new ApiStack(app, "api", {
    table: storageStack.table,
  });

  new FrontendStack(app, "frontend", {
    api: apiStack.api,
  });
}