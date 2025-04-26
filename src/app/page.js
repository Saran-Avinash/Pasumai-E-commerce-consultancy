// import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              ShopNow
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#" className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Shop
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Categories
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                About
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-full max-w-sm">
              <Input type="search" placeholder="Search products..." className="pr-8" />
              <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <Button variant="outline" size="icon" className="relative">
              {/* <ShoppingCart className="h-5 w-5" /> */}
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="bg-muted py-16 md:py-24">
            <div className=" items-center container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                      Healthy Groceries , daily!!
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Discover our latest arrivals with up to 40% off. Limited time offer.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg">Shop Now</Button>
                    <Button size="lg" variant="outline">
                      View Lookbook
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    alt="Hero Image"
                    className="aspect-[4/3] overflow-hidden rounded-xl object-cover"
                    height="400"
                    src="/hero.jpg"
                    width="600"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Browse our curated collections and find your perfect style
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
              {["Fruits", "Vegetables", "Snacks", "Spices"].map((category) => (
                <Link key={category} href={`/product/${category.toLowerCase()}`} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-muted relative overflow-hidden rounded-lg">
                    <img
                      src={`/${category.toLowerCase()}.jpg`}
                      alt={category}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <h3 className="text-xl font-medium text-white">{category}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our most popular items handpicked for you
                </p>
              </div>
            </div>
            <ProductGrid />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Subscribe to our newsletter to receive updates on new arrivals, special offers and other discount
                    information.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="grid w-full gap-2">
                  <form className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" className="flex-1" />
                    <Button type="submit">Subscribe</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">ShopNow</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Your one-stop destination for trendy fashion and accessories.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm">
            <p>© 2024 ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

