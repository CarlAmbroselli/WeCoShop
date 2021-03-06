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
- VK Pay to pay friends
- Enter email details + password

## API

### Login
```
GET /api/v1/login/vk

POST /api/v1/login/guest
Request (optional body if recurring user): 
{
    email: string,
    password: string,
    callbackUrl: string
}
Response: Person
```

### User

GET /api/v1/me
Response: 
if authenticated: Person
if not authenticated: `null`

### Party
```
POST /api/v1/party/create
Request: Party
Response: Party

GET /api/v1/party/list
Response: Party[]

POST /api/v1/party/:partyId/addItem
Request: PartyItem

GET /api/v1/party/:partyId/details
Response: 
{
    details: Party,
    items: PartyItem[]
}
```

### Search

```
GET /api/v1/search/item/:search/:page
Response: SearchResult

GET /api/v1/search/location/:text
Response: Location

All pictures can be accessed at:
https://search.wecoshop.club/products/images/{id}.jpg
```

### Backend Entities
```
Person
{
    userId: int,
    vkId: optional<int>,
    name: optional<string>,
    pictureUrl: optional<string>
}

Party
{
    partyId: optional<int>, // (not set during creation)
    creatorUser: optional<int>, // (not set during creation)
    name: string,
    date: int,
    location: Location,
    category: optional<string>,
    header_picture: optional<string>
}

PartyItem
{
    productId: int,
    gender: string,
    productDisplayName: string,
    usage: string,
    season: string,
    articleType: string,
    subCategory: string,
    masterCategory: string
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

Location
{
    name: string,
    lat: float,
    lon: float
}
```