# WeCoShop

## Components

### Signup
- Login with VK
- Continue as Guest (details during the payment process)

### Parties
- List of my planned parties

### New Party
- Select friends
- Select Time / Date
- Select Location

### Recommendation ?
- Would you like us to ananlyze your VK pictures to make recommendations?

### Social Shopping Cart Packing
- Everyone can search articles and add to the shopping cart

### Order
- VK Pay
- Enter email details + password

## API

### Login
```
GET /login/vk
{
    userId: 123,
    name: "Moe Chedar",
    pictureUrl: "https://picsum.photos/50/50"
}

GET /login/guest
{
    userId: 123,
    pictureUrl: "https://picsum.photos/50/50"
}
```
