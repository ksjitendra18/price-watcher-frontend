import Product from "./Product";

export default interface ScrapeResponseData {
  productData: Product;
  provider: "amazon" | "flipkart";
}
