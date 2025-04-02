const clientController = {};

import clientModel from "../Models/ClientModel.js";

// SELECT
clientController.getClient = async (req, res) => {
  const client = await clientModel.find();
  res.json(client);
};

// INSERT
clientController.insertClient = async (req, res) => {
  const { fullname, email, username, password,birth,number } = req.body;
  const newClient = new ClientModel({fullname, email, username, password,birth,number});

  await newClient.save();
  res.json({ message: "Client saved" });
};

// DELETE

clientController.deleteClient = async (req, res) => {
  await clientModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
}

// UPDATE
clientController.updateClient = async (req, res) => {
  const { fullname, email, username, password,birth,number } = req.body;
  await clientModel.findByIdAndUpdate(req.params.id,{ fullname, email, username, password,birth,number},
    { new: true }
  );
  res.json({ message: "Client updated" });
}

export default clientController;
