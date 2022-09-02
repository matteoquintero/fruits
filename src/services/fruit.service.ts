import http from "@/http-common";

/* eslint-disable */
class FruitService {
  get(): Promise<any> {
    return http.get(`fruits`);
  }
}
/*singleton*/
export default new FruitService();
