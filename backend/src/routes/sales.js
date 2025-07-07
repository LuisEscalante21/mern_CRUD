import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router
    .route("/")
    .get(salesController.getSales)
    .post(salesController.insertSales);

router
    .route("/:id")
    .delete(salesController.deleteSales)
    .put(salesController.updateSales);

router.route("/sales-by.category")
    .get(salesController.getSalesByCategory)

router.route("/sales-by-product")
    .get(salesController.getSalesByProduct)

router.route("/total-earnings")
    .get(salesController.getTotalEarnings)

router.route("/frequent-customers")
    .get(salesController.getFrequentCustomer)

export default router;
