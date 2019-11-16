import React from "react";
import styled from "styled-components";
import { media } from "../mediaStyles";
import { Card, Icon } from "antd";

const ItemCard = styled(Card)`
  width: 100%;
  margin-bottom: 10px !important;
  -webkit-box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);

  ${media.tablet`
  margin-right: 10px !important;
  max-width: 300px;
  max-height: 500px;
    `}
`;

const AddButton = styled(Icon)`
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;

const ProductDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: black;
`;

export default item => {
  return (
    <ItemCard
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          src={`https://search.wecoshop.club/products/images/${item.id ||
            item.product_id}.jpg`}
        />
      }
    >
      <Card.Meta
        title={item.productDisplayName || item.product_display_name}
        description={
          <ProductDescription>
            {item.masterCategory || item.master_category}
            {item.addItem && (
              <AddButton type="shopping-cart" onClick={item.addItem} />
            )}
          </ProductDescription>
        }
      />
    </ItemCard>
  );
};
