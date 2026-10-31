import React from 'react';

/**
 * Restaurant Guru "Best vegetarian restaurant" award badge -- embed code supplied
 * by the client. Styled by the stylesheet linked in index.html; that CSS targets
 * the element id, so render this at most once per page.
 */
export const RestaurantGuruBadge: React.FC = () => (
  <a
    id="rg26-b-circledLeaves27"
    target="_blank"
    rel="noopener noreferrer"
    href="https://restaurantguru.com/Yummy-Dosa-Multi-Cuisine-Pure-Veg-Restaurant-Ilford"
    className="rg26-b-circledLeaves27--light rg26-b-circledLeaves27--2025"
  >
    <span className="rg26-b-circledLeaves27__title">Best vegetarian restaurant</span>
    <span className="rg26-b-circledLeaves27__separator"></span>
    <span className="rg26-b-circledLeaves27__name">Yummy Dosa Pure Veg indian Restaurant</span>
  </a>
);
