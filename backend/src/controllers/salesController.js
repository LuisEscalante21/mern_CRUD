import SalesModel from "../models/Sales.js";

const SalesController = {};
// S E L E C T
SalesController.getSales = async (req, res) => {
    try{
        const sales = await SalesModel.find();
        res.status(200).json(sales);
    }catch (error){
        console.log("Error"+error)
        res.status(500).json({message: "Internal server error"});
    } 
};

// I N S E R T
SalesController.insertSales = async (req, res) => {
    try{
        const { product, category, customer, total } = req.body;

        if(total < 0) {
            res.status(400).json({message: "ingrese un valor valido"});
        }

        const newSales = new SalesModel({product, category, customer, total});
        await newSales.save();
        res.status(200).json({message: "sales saved"});
    }catch (error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    } 
};

// D E L E T E
SalesController.deleteSales = async (req, res) => {
    try{
        await SalesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "sales deleted"});
    }catch(error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
  
};

// U P D A T E
SalesController.updateSales = async (req, res) => {
    try{
        const {product, category, customer, total } = req.body;
        const updateSales = await SalesModel.findByIdAndUpdate(
          req.params.id,
          {product, category, customer, total },
          { new: true }
        );

        res.status(200).json({message: "sales update"});
    }catch(error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

//VENTAS POR CATEGORIA
SalesController.getSalesByCategory = async(req, res)=>{
    try{
        const resultado = await SalesModel.aggregate(
        [
            {
                $group: {
                    _id: "$category",
                    totalSales: { $sum: "$total" }
                },
                $sort: { 
                    totalSales: -1 
                }

            }
        ]
    );
        res.status(200).json(resultado);
    }catch (error) {
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

//VENTAS POR PRODUCTO
SalesController.getSalesByProduct = async(req, res)=>{
    try{
        const resultado = await SalesModel.aggregate(
        [
            {
                $group: {
                    _id: "$product",
                    totalSales: { $sum: 1}
                },
                $sort: { 
                    totalSales: -1 
                }

            }
        ]
    );
        res.status(200).json(resultado);
    }catch (error) {
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

//GANANCIAS TOTALES
SalesController.getTotalEarnings = async(req, res)=>{
    try{
        const resultado = await SalesModel.aggregate(
        [
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$total" }
                }
            }
        ]
    );
        res.status(200).json(resultado);
    }catch (error) {
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

//CLIENTE FRRECUENTE
SalesController.getFrequentCustomer = async(req, res)=>{
    try{
        const resultado = await SalesModel.aggregate(
        [
            {
                $group: {
                    _id: "$customer",
                    comprasRealizadas: { $sum: 1 }
                }
            },
            {
                $sort: { 
                    comprasRealizadas: -1
                }
            },
            {
                $limit: 3
            }
        ]
    );
        res.status(200).json(resultado);
    }catch (error) {
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

export default SalesController;