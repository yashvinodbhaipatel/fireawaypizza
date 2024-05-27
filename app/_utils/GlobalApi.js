import { request, gql } from 'graphql-request';

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

console.log("NEXT_PUBLIC_BACKEND_API_URL:", MASTER_URL);

const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getFood = async (category) => {
  const query = gql`
    query GetFood($category: String!) {
      bestSellings(where: { categories_some: { slug: $category } }) {
        aboutUs
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        foodType
        slug
      }
    }
  `;
  const variables = { category };
  const result = await request(MASTER_URL, query, variables);
  return result;
};

const GetFoodDetail = async (foodSlug) => {
  const query = gql`
    query FoodDetail($foodSlug: String!) {
      bestSelling(where: { slug: $foodSlug }) {
        aboutUs
        foodType
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        slug
        menu {
          ... on Menu {
            id
            categories
            menuItem {
              ... on MenuItem {
                id
                name
                price
                productImage {
                  url
                }
                description
                addons {
                  ... on Addons {
                    id
                    name
                    price
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = { foodSlug };
  const result = await request(MASTER_URL, query, variables);
  return result;
};

const AddToCart = async (data) => {
  const query = gql`
    mutation AddToCart(
      $email: String!,
      $price: Float!,
      $productDescription: String!,
      $productImage: String!,
      $productName: String!,
      $addons: String!,
      $addonsPrice: Float!
    ) {
      createUserCart(
        data: {
          email: $email,
          price: $price,
          productDescription: $productDescription,
          productImage: $productImage,
          productName: $productName,
          addons: $addons,
          addonsPrice: $addonsPrice
        }
      ) {
        id
        addons
        addonsPrice
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  const variables = {
    email: data.email,
    price: data.price,
    productDescription: data.description,
    productImage: data.productImage,
    productName: data.name,
    addons: data.addons,
    addonsPrice: data.addonsPrice
  };
  const result = await request(MASTER_URL, query, variables);
  return result;
};

const GetUserCart = async (email) => {
  const query = gql`
    query getUserCart($email: String!) {
      userCarts(where: { email: $email }) {
        id
        email
        price
        productDescription
        addons
        addonsPrice
        productImage
        productName
      }
    }
  `;
  
  const variables = { email };
  const result = await request(MASTER_URL, query, variables);
  return result;
};

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($id: ID!) {
    deleteUserCart(where: { id: $id }) {
      id
    }
  }
`;

const removeFromCart = async (id) => {
  const variables = { id };
  const result = await request(MASTER_URL, REMOVE_FROM_CART, variables);
  return result;
};

export default {
  GetCategory,
  getFood,
  GetFoodDetail,
  AddToCart,
  GetUserCart,
  removeFromCart
};
