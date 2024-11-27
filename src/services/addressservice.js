const AddressModel = require("../models/address");


const createAddress = async (user,shippAddress)=>{
  try {
   const address = new AddressModel(shippAddress);
    address.user = user;
    await address.save();
    user.address.push(address);

    await user.save();
        if (!address) {
          throw new Error(`Address not created`);
        }
        return address;
      }

   catch (error) {
    throw new Error(error.message);
  }
}

const findAllAddresses = async (addressIds) => {
    try {
      console.log(addressIds)

      const addresses = await Promise.all(
        addressIds.map(async (addressId) => {
          const address = await AddressModel.findById(addressId.addressId);
          if (!address) {
            throw new Error(`Address not found by id: ${addressId}`);
          }
          return address;
        })
      );

      return addresses;
    } catch (error) {
      throw new Error(error.message);
    }
  };


const findAddressById = async(addressId)=>{
   try{
    const address = await AddressModel.findById(addressId);
    if (!address) {
        throw new Error("address not found by id :", addressId);
      }
      console.log(address)
      return address;
    } catch (error) {
      throw new Error(error.message);
    }
}

module.exports = {
    findAddressById,
    findAllAddresses,
    createAddress
  };