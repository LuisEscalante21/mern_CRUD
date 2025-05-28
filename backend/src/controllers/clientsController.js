const clientsController = {};
import clientsModel from "../models/Clients.js";

// S E L E C T
clientsController.getClients = async (req, res) => {
  const clients = await productsModel.find();
  res.json(clients);
};

// I N S E R T
clientsController.insertClients = async (req, res) => {
  const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body;
  const newClient = new clientsModel({ name, lastName, email, password, telephone, dui, isVerified });
  await newClient.save();
  res.json({ message: "client saved" });
};

// D E L E T E
clientsController.deleteClients = async (req, res) => {
  await clientsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "client deleted" });
};

// U P D A T E
clientsController.updateClients = async (req, res) => {
  const {name, lastName, email, password, telephone, dui, isVerified } = req.body;
  const updateClient = await clientsModel.findByIdAndUpdate(
    req.params.id,
    {name, lastName, email, password, telephone, dui, isVerified },
    { new: true }
  );

  if(!updateClient){
    res.json({ message: "client not found" });
  }else {
    res.json({ message: "client updated" });
  }
};

export default clientsController;