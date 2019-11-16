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
Response: Person

GET /login/guest
Response: Person
```

### Party
```
POST /party/create
Request: Party
Response: Party
```

### Search

```
GET /search/item/:search
Response: SearchResult
```

### Backend Entities
```
Person
{
    userId: int,
    name: optional<string>,
    pictureUrl: optional<string>
}

Party
{
    partyId: int, // (not set during creation)
    creatorUser: int, // (not set during creation)
    name: string,
    date: int,
    location: {
        name: string,
        lat: float,
        lon: float
    }
}

SearchResult
{
    result: SearchItem[]
}

SearchItem
{
    id: int,
    name: string,
    pictureUrl: string,
    price: int,
    currency: string
}
```