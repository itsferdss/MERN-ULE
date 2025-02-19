import React from 'react'
import { useState } from 'react'
import { Box, Heading, HStack, IconButton, Image, Input, ModalOverlay, Text, useColorModeValue, useToast, useDisclosure, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, 
    ModalFooter, Button
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useProductStore } from '../store/product';

const ProductCard = ({product }) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore(); 
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: "Failed to update product",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidded'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "x1"}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectfit='cover' />

            <Box p={4}>
                <Heading as='h1' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
                    ₱{product.price}   
                </Text>
                <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
                    Stock: {product.quantity}   
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
         </Box>


         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Update {updatedProduct.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                             />
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                               />
                            <Input
                                placeholder="Product Quantity"
                                name="quantity"
                                type="number"
                                value={updatedProduct.quantity}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, quantity: e.target.value})}
                            />
                            <Input
                                placeholder="Product Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                               />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
         </Modal>
    </Box>
  );
};

export default ProductCard
