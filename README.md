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
POST /login/vk
Request:
{
    callbackUrl: string
}
Response: Person

POST /login/guest
Request (optional body if recurring user): 
{
    name: string,
    email: optional<string>,
    password: optional<string>,
    callbackUrl: string
}
Response: Person
```

### Party
```
POST /party/create
Request: Party
Response: Party

GET /party/list
Response: Party[]
```

### Search

```
GET /search/item/:search
Response: SearchResult

GET /search/location/:text
Response: Location
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
    partyId: optional<int>, // (not set during creation)
    creatorUser: optional<int>, // (not set during creation)
    name: string,
    date: int,
    location: Location,
    headerPicture: optional<string>
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