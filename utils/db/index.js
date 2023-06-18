"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const firebase_1 = require("../../services/firebase");
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const productsCollection = firebase_1.firestore.collection("products");
        const productDocumentRefs = yield productsCollection.listDocuments();
        const products = yield Promise.all(productDocumentRefs.map((documentRef) => __awaiter(this, void 0, void 0, function* () {
            const documentSnapshot = yield documentRef.get();
            const documentData = documentSnapshot.data();
            documentData.id = documentSnapshot.id;
            return documentData;
        })));
        return products;
    });
}
exports.getAllProducts = getAllProducts;
