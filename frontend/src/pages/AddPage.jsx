import React from 'react'
import { useState } from 'react'
import { Container, VStack, Button, Heading, Box, useColorModeValue, Input, useToast } from "@chakra-ui/react";
import { useProductStore } from '../store/product';

const AddPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: ""
  });

  const toast = useToast();
  const {createProduct}=useProductStore()

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", quantity: "", image: ""});
  };
  

  return <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} fontsize={"2x1"} textAlign={"center"} mb={8}>
          Create a New Product
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})} 
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})} 
              />
              <Input
                placeholder='Product Quantity'
                name='quantity'
                type='number'
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value})} 
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})} 
              />

              <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                Add Product
              </Button> 
            </VStack>
        </Box>
      </VStack>
    </Container>
};

export default AddPage