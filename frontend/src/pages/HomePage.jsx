import React, { useState, useEffect } from 'react';
import { Container, VStack, Text, SimpleGrid, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import ProductCard from '../components/ProductCard.jsx';
import { useProductStore } from '../store/product';

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW='container.x1' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
        >
          Current Products ⌛️
        </Text>

        <InputGroup size='sm' mb={4} width="25%">
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
            lg: 4,
          }}
          spacing={10}
          w={'full'}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {filteredProducts.length === 0 && (
          <Text fontSize='x1' textAlign={'center'} fontWeight='bold' color='gray.500'>
            No Products Found!{' '}
            <Link to={'/add'}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;