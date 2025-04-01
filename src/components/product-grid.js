import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample product data
//id: number, name: string, price: float, image: string/path, category: string, isNew: boolean, isSale: boolean,  
// connection string: mongodb+srv://saranbaskarmsp:qubsbrczNur82RjO@supermarket.4rce2jo.mongodb.net/?retryWrites=true&w=majority&appName=SuperMarket
const products = [
  // {
  //   id: 1,
  //   name: "Cotton T-Shirt",
  //   price: 29.99,
  //   image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
  //   category: "Clothing",
  //   isNew: true,
  //   isSale: false,
  // },
  // {
  //   id: 2,
  //   name: "Denim Jeans",
  //   price: 59.99,
  //   originalPrice: 79.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Jeans",
  //   category: "Clothing",
  //   isNew: false,
  //   isSale: true,
  // },
  // {
  //   id: 3,
  //   name: "Leather Sneakers",
  //   price: 89.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Sneakers",
  //   category: "Footwear",
  //   isNew: true,
  //   isSale: false,
  // },
  // {
  //   id: 4,
  //   name: "Crossbody Bag",
  //   price: 49.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Bag",
  //   category: "Accessories",
  //   isNew: false,
  //   isSale: false,
  // },
  // {
  //   id: 5,
  //   name: "Wool Sweater",
  //   price: 69.99,
  //   originalPrice: 99.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Sweater",
  //   category: "Clothing",
  //   isNew: false,
  //   isSale: true,
  // },
  // {
  //   id: 6,
  //   name: "Aviator Sunglasses",
  //   price: 39.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Sunglasses",
  //   category: "Accessories",
  //   isNew: false,
  //   isSale: false,
  // },
  // {
  //   id: 7,
  //   name: "Leather Watch",
  //   price: 129.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Watch",
  //   category: "Accessories",
  //   isNew: true,
  //   isSale: false,
  // },
  // {
  //   id: 8,
  //   name: "Ankle Boots",
  //   price: 99.99,
  //   originalPrice: 149.99,
  //   image: "/placeholder.svg?height=300&width=300&text=Boots",
  //   category: "Footwear",
  //   isNew: false,
  //   isSale: true,
  // },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {products.map((product) => (
        <Link key={product.id} href={`#product-${product.id}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute left-2 top-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-500/90">New</Badge>}
                {product.isSale && <Badge variant="destructive">Sale</Badge>}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">{product.category}</div>
              <h3 className="mt-1 font-medium">{product.name}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center">
                {product.originalPrice ? (
                  <>
                    <span className="font-medium text-primary">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

