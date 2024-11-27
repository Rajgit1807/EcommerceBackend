const AddressService =  require("../services/addressservice");

const createAddress = async (req, res) => {
  const user = await req.user;
  console.log(req.user)
  try {
      let address = await AddressService.createAddress(user, req.body);
      return res.status(201).send(address);
  } catch (error) {
      return res.status(500).send({ error: error.message });
  }
};

const getAddressById = async (req, res) => {
    try {
      const address= await AddressService.findAddressById(req.params.id);
      return res.status(200).send(address);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  const findAllAddresses = async (req,res) => {
    const addIds = await req.body
    console.log(req)
    try {
      const addressess= await AddressService.findAllAddresses(addIds);
  
      return res.status(200).send(addressess);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };


  module.exports ={getAddressById,findAllAddresses,createAddress}