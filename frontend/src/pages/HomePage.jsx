import React from 'react'
import { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import  ProductCard  from '../components/ProductCard.jsx'

import { useProductStore } from '../store/product';

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.x1' py={12}>

        <VStack spacing ={8}>
          <Text
            fontSize={"39"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cryan.400, blue.500"}
            bgClip={"text"}
            textAlign={"center"}
            >
              Current Products 
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 3,
              lg: 4
            }}
            spacing={10}
            w={"full"}
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </SimpleGrid>


          {products.length === 0 && (
            <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No Products Found! {""}
              <Link to={"/add"}>
                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline"}}>
                  Create a product
                </Text>
              </Link>
            </Text>
          )}
          

        </VStack>
    </Container>
  )
}

export default HomePage